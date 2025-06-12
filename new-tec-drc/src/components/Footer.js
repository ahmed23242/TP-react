// Importation de React et des styles
import React from 'react';
import './Footer.css'; // CSS spécifique pour le Footer

// Composant du pied de page
function Footer() {
  return (
    // Conteneur principal du pied de page
    <div className="footer-container">
      {/* Emblème de la RDC */}
      <img
        src="image.png" // L'utilisateur utilise des images locales
        alt="DRC Emblem"
        className="footer-emblem"
      />
      {/* Texte de copyright */}
      <div className="footer-copyright">
        Copyright © 2024. Tous droits réservés.
      </div>
    </div>
  );
}

export default Footer; 