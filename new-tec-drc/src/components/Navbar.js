import React from 'react';
import './Navbar.css'; // CSS spécifique pour la Navbar

// Composant de la barre de navigation principale
function Navbar() {
  return (
    // Conteneur principal de la barre de navigation
    <div className="navbar-container-main"> {/* Conteneur principal de la Navbar */}
      {/* Barre supérieure avec le titre et les boutons de fenêtre */}
      <div className="window-bar">
        {/* Titre de l'application */}
        <div className="app-title-in-bar">App NEW TEC DRC</div>
        {/* Le texte du ministère et le drapeau ont été retirés d'ici */}
        <div className="window-buttons">
          <span className="window-btn" />
          <span className="window-btn" />
          <span className="window-btn" />
        </div>
      </div>
      
      {/* Seconde ligne de la Navbar: Texte du ministère */}
      <div className="navbar-ministry-text-row">
        <div className="ministry-text-block-navbar">
          République Démocratique du Congo<br />
          Ministère de Transport
        </div>
      </div>

      {/* Troisième ligne de la Navbar: Drapeau */}
      <div className="navbar-flag-row">
        <img
          src="drapo.png" // Nom d'image conservé
          alt="DRC Flag"
          className="flag-navbar-standalone"
        />
      </div>
    </div>
  );
}

export default Navbar; 