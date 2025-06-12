import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import './Barcode.css';

/**
 * Composant pour afficher un code-barre
 * @param {Object} props - Propriétés du composant
 * @param {string} props.value - Valeur à encoder dans le code-barre
 * @param {function} props.onGenerated - Callback appelé quand le code-barre est généré
 */
const Barcode = ({ value, onGenerated }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (value && canvasRef.current) {
            try {
                // Générer le code-barre avec des paramètres optimisés
                JsBarcode(canvasRef.current, value, {
                    format: "CODE128B",
                    width: 3,
                    height: 150,
                    displayValue: true,
                    fontSize: 24,
                    font: 'monospace',
                    textMargin: 6,
                    margin: 20,
                    background: "#FFFFFF",
                    lineColor: "#000000",
                    text: value,
                    textAlign: "center",
                    fontOptions: "bold",
                    valid: (valid) => {
                        if (!valid) {
                            console.error("Le code-barre n'a pas pu être généré correctement");
                        }
                    }
                });

                // Notifier que le code-barre a été généré
                if (onGenerated) {
                    onGenerated(canvasRef.current.toDataURL("image/png", 1.0));
                }
            } catch (error) {
                console.error("Erreur lors de la génération du code-barre:", error);
            }
        }
    }, [value, onGenerated]);

    return (
        <div className="barcode-container">
            <canvas ref={canvasRef} className="barcode-canvas" />
            <div className="barcode-instructions">
                Pour scanner, assurez-vous que :
                <ul>
                    <li>L'écran est bien éclairé</li>
                    <li>Le code-barre est entièrement visible</li>
                    <li>L'appareil photo est stable et net</li>
                </ul>
            </div>
        </div>
    );
};

export default Barcode; 