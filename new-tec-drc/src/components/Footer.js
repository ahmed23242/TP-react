import React from 'react';
import './Footer.css'; // CSS spécifique pour le Footer

function Footer() {
  return (
    <div className="footer-container">
      <img
        src="image.png" // L'utilisateur utilise des images locales
        alt="DRC Emblem"
        className="footer-emblem"
      />
      <div className="footer-copyright">
        Copyright © 2024. Tous droits réservés.
      </div>
    </div>
  );
}

export default Footer; 