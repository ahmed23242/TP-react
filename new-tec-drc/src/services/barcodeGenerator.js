// Importation de la bibliothèque JsBarcode
import JsBarcode from 'jsbarcode';

/**
 * Génère un code-barre à partir d'un numéro de plaque
 * @param {string} plateNumber - Numéro de plaque
 * @returns {string} URL de l'image du code-barre en base64
 */
export const generateBarcode = (plateNumber) => {
    // Créer un élément canvas temporaire
    const canvas = document.createElement('canvas');
    
    // Générer le code-barre avec des paramètres optimisés pour le scan
    JsBarcode(canvas, plateNumber, {
        format: "CODE128B", // Format optimisé pour les caractères alphanumériques
        width: 3,          // Largeur plus importante des barres
        height: 150,       // Hauteur plus importante pour une meilleure lisibilité
        displayValue: true, // Afficher le numéro sous le code-barre
        fontSize: 24,      // Taille de police plus grande
        font: 'monospace', // Police monospace pour une meilleure lisibilité
        textMargin: 6,     // Plus d'espace entre le code-barre et le texte
        margin: 20,        // Marges plus importantes
        background: "#FFFFFF", // Fond blanc pur
        lineColor: "#000000", // Noir pur pour un meilleur contraste
        text: plateNumber, // Texte personnalisé sous le code-barre
        textAlign: "center", // Centrer le texte
        fontOptions: "bold", // Texte en gras
        valid: (valid) => {
            if (!valid) {
                console.error("Le code-barre n'a pas pu être généré correctement");
            }
        }
    });
    
    // Convertir le canvas en URL de données (base64) avec une qualité maximale
    return canvas.toDataURL("image/png", 1.0);
};

/**
 * Télécharge le code-barre comme une image PNG
 * @param {string} plateNumber - Numéro de plaque
 */
export const downloadBarcode = (plateNumber) => {
    try {
        // Générer le code-barre
        const barcodeUrl = generateBarcode(plateNumber);
        
        // Créer un lien temporaire pour le téléchargement
        const link = document.createElement('a');
        link.href = barcodeUrl;
        link.download = `barcode-${plateNumber.replace(/\//g, '-')}.png`;
        
        // Déclencher le téléchargement
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Erreur lors de la génération du code-barre:", error);
        alert("Une erreur est survenue lors de la génération du code-barre");
    }
}; 