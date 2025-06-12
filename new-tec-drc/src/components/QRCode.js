import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCode.css';

/**
 * Composant pour afficher un QR code
 * @param {Object} props - Propriétés du composant
 * @param {string} props.value - Valeur à encoder dans le QR code
 * @param {function} props.onGenerated - Callback appelé quand le QR code est généré
 */
const QRCode = ({ value }) => {
    return (
        <div className="qrcode-container">
            <div className="qrcode-wrapper">
                <QRCodeSVG
                    value={value}
                    size={200} // Taille du QR code
                    level="H" // Niveau de correction d'erreur le plus élevé
                    includeMargin={true}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                />
            </div>
            <div className="qrcode-value">{value}</div>
            <div className="qrcode-instructions">
                Pour scanner, assurez-vous que :
                <ul>
                    <li>L'écran est bien éclairé</li>
                    <li>Le QR code est entièrement visible</li>
                    <li>L'appareil photo est stable et net</li>
                </ul>
            </div>
        </div>
    );
};

export default QRCode; 