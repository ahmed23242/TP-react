import { useState } from 'react';
import {
    generatePackageNumber,
    extractSequentialNumber,
    extractSeries
} from '../services/packageNumberGenerator';

/**
 * Hook personnalisé pour gérer la génération de numéros de paquets
 * @returns {Object} Objet contenant le numéro actuel et la fonction de génération
 */
const usePackageNumber = () => {
    // État pour stocker le dernier numéro généré
    const [currentPackageNumber, setCurrentPackageNumber] = useState('0001/01/A');

    /**
     * Génère un nouveau numéro de paquet
     */
    const generateNewNumber = () => {
        const lastNumber = extractSequentialNumber(currentPackageNumber);
        const currentSeries = extractSeries(currentPackageNumber);
        
        const newNumber = generatePackageNumber(lastNumber, currentSeries);
        setCurrentPackageNumber(newNumber);
        
        return newNumber;
    };

    return {
        currentPackageNumber,
        generateNewNumber
    };
};

export default usePackageNumber; 