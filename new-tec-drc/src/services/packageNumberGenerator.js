// Service de génération de numéros de paquets
// Format: XXXX/MM/L où:
// XXXX = numéro séquentiel sur 4 chiffres
// MM = mois en cours sur 2 chiffres
// L = lettre de série (A-Z)

/**
 * Génère un nouveau numéro de paquet
 * @param {number} lastNumber - Dernier numéro utilisé (0-9999)
 * @param {string} currentSeries - Lettre de série actuelle (A-Z)
 * @returns {string} Nouveau numéro de paquet au format XXXX/MM/L
 */
export const generatePackageNumber = (lastNumber = 0, currentSeries = 'A') => {
    // Obtenir le mois en cours (1-12)
    const currentMonth = new Date().getMonth() + 1;
    
    // Incrémenter le dernier numéro
    let nextNumber = lastNumber + 1;
    let nextSeries = currentSeries;
    
    // Si on dépasse 9999, on passe à la série suivante et on recommence à 1
    if (nextNumber > 9999) {
        nextNumber = 1;
        nextSeries = String.fromCharCode(currentSeries.charCodeAt(0) + 1);
        
        // Si on dépasse Z, on revient à A
        if (nextSeries > 'Z') {
            nextSeries = 'A';
        }
    }
    
    // Formater le numéro sur 4 chiffres
    const formattedNumber = nextNumber.toString().padStart(4, '0');
    // Formater le mois sur 2 chiffres
    const formattedMonth = currentMonth.toString().padStart(2, '0');
    
    // Retourner le numéro formaté
    return `${formattedNumber}/${formattedMonth}/${nextSeries}`;
};

/**
 * Valide si un numéro de paquet est au bon format
 * @param {string} packageNumber - Numéro de paquet à valider
 * @returns {boolean} True si le format est valide
 */
export const isValidPackageNumber = (packageNumber) => {
    const regex = /^\d{4}\/\d{2}\/[A-Z]$/;
    return regex.test(packageNumber);
};

/**
 * Extrait le numéro séquentiel d'un numéro de paquet
 * @param {string} packageNumber - Numéro de paquet
 * @returns {number} Numéro séquentiel
 */
export const extractSequentialNumber = (packageNumber) => {
    if (!isValidPackageNumber(packageNumber)) {
        return 0;
    }
    return parseInt(packageNumber.split('/')[0], 10);
};

/**
 * Extrait la lettre de série d'un numéro de paquet
 * @param {string} packageNumber - Numéro de paquet
 * @returns {string} Lettre de série
 */
export const extractSeries = (packageNumber) => {
    if (!isValidPackageNumber(packageNumber)) {
        return 'A';
    }
    return packageNumber.split('/')[2];
}; 