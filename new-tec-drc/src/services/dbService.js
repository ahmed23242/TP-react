// Création de la base de données IndexedDB
const dbName = 'plaquesDB';
const dbVersion = 1;
const storeName = 'plaques';

// Fonction pour ouvrir la connexion à la base de données
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'numeroPlaque' });
        // Création d'un index unique pour le numéro de plaque
        store.createIndex('numeroPlaque', 'numeroPlaque', { unique: true });
        store.createIndex('dateCreation', 'dateCreation', { unique: false });
      }
    };
  });
};

// Fonction pour vérifier si un numéro de plaque existe déjà
export const checkPlaqueExists = async (numeroPlaque) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(numeroPlaque);

      request.onsuccess = () => {
        resolve(request.result !== undefined);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du numéro de plaque:', error);
    throw error;
  }
};

// Fonction pour ajouter une nouvelle plaque
export const ajouterPlaque = async (plaque) => {
  try {
    // Vérifier si le numéro de plaque existe déjà
    const exists = await checkPlaqueExists(plaque.numeroPlaque);
    if (exists) {
      throw new Error('Ce numéro de plaque existe déjà');
    }

    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      // Ajouter la date de création
      const plaqueWithDate = {
        ...plaque,
        dateCreation: new Date().toISOString()
      };

      const request = store.add(plaqueWithDate);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        // Si l'erreur est due à un doublon
        if (request.error.name === 'ConstraintError') {
          reject(new Error('Ce numéro de plaque existe déjà'));
        } else {
          reject(request.error);
        }
      };
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la plaque:', error);
    throw error;
  }
};

// Fonction pour récupérer toutes les plaques
export const getAllPlaques = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des plaques:', error);
    throw error;
  }
};

// Fonction pour récupérer une plaque par son numéro
export const getPlaque = async (numeroPlaque) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(numeroPlaque);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la plaque:', error);
    throw error;
  }
}; 