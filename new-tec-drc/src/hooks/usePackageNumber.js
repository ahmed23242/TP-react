import { useState } from 'react';
import { checkPlaqueExists } from '../services/dbService';

/**
 * Hook personnalisé pour gérer la génération de numéros de paquets
 * @returns {Object} Objet contenant le numéro actuel et la fonction de génération
 */
const usePackageNumber = () => {
    // État pour stocker le dernier numéro généré
    const [currentPackageNumber, setCurrentPackageNumber] = useState('');

    /**
     * Génère un nouveau numéro de paquet
     */
    const generateNewNumber = async () => {
        let isUnique = false;
        let newNumber = '';

        while (!isUnique) {
            // Génération du numéro
            const num = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
            const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
            const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            newNumber = `${num}/${month}/${letter}`;

            // Vérification de l'unicité
            try {
                const exists = await checkPlaqueExists(newNumber);
                if (!exists) {
                    isUnique = true;
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du numéro:', error);
                // En cas d'erreur, on considère le numéro comme unique pour éviter une boucle infinie
                isUnique = true;
            }
        }

        setCurrentPackageNumber(newNumber);
        return newNumber;
    };

    return {
        currentPackageNumber,
        generateNewNumber
    };
};

export default usePackageNumber; 