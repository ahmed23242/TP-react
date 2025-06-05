import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainNavigationBar.css';

function MainNavigationBar() {
  const navigate = useNavigate();
  const [isPlaquesDropdownOpen, setIsPlaquesDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Logique de déconnexion à implémenter si nécessaire
    navigate('/login');
  };

  const togglePlaquesDropdown = () => {
    setIsPlaquesDropdownOpen(!isPlaquesDropdownOpen);
  };

  return (
    <nav className="main-navigation-bar">
      <ul>
        <li><a href="#accueil">Accueil</a></li>
        <li 
          onMouseEnter={() => setIsPlaquesDropdownOpen(true)}
          onMouseLeave={() => setIsPlaquesDropdownOpen(false)}
        >
          <a href="#plaques" onClick={togglePlaquesDropdown}>Plaques</a>
          {isPlaquesDropdownOpen && (
            <ul className="dropdown-menu">
              <li><a href="#controler">Contrôler</a></li>
              <li><a href="#ajouter">Ajouter</a></li>
              <li><a href="#modifier">Modifier</a></li>
              <li><a href="#supprimer">Supprimer</a></li>
            </ul>
          )}
        </li>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#departement">Département</a></li>
        <li><a href="#statistiques">Statistiques</a></li>
      </ul>
      <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
    </nav>
  );
}

export default MainNavigationBar; 