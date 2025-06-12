// Importation des dépendances React et React Router
import React from 'react';
import { Outlet } from 'react-router-dom';

// Importation des composants de navigation et pied de page
import Navbar from './Navbar';
import Footer from './Footer';

// Importation des styles CSS
import './Layout.css';

// Composant Layout : Structure principale de l'application
function Layout() {
  return (
    <>
      {/* Barre de navigation en haut de la page */}
      <Navbar />
      
      {/* Zone principale du contenu */}
      <main className="main-content-area">
        {/* Outlet permet d'afficher les composants enfants selon la route active */}
        <Outlet />
      </main>
      
      {/* Pied de page de l'application */}
      <Footer />
    </>
  );
}

export default Layout; 