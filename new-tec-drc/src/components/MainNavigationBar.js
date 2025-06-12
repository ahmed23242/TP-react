import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../services/authService';
import './MainNavigationBar.css';

function MainNavigationBar() {
  const navigate = useNavigate();
  const [isPlaquesDropdownOpen, setIsPlaquesDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Appel de la fonction de déconnexion
    navigate('/login');
  };

  const togglePlaquesDropdown = () => {
    setIsPlaquesDropdownOpen(!isPlaquesDropdownOpen);
  };

  return (
    <nav className="main-navigation-bar">
      <ul>
        <li><Link to="/dashboard">Accueil</Link></li>
        <li 
          onMouseEnter={() => setIsPlaquesDropdownOpen(true)}
          onMouseLeave={() => setIsPlaquesDropdownOpen(false)}
        >
          <a href="#" onClick={(e) => e.preventDefault()}>Plaques</a>
          {isPlaquesDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="#controler">Contrôler</Link></li>
              <li><Link to="/dashboard/plaques/ajouter">Ajouter</Link></li>
              <li><Link to="#modifier">Modifier</Link></li>
              <li><Link to="#supprimer">Supprimer</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><a href="#departement">Département</a></li>
        <li><Link to="/dashboard/statistiques">Statistiques</Link></li>
      </ul>
      <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
    </nav>
  );
}

export default MainNavigationBar; 