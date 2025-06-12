// Importation des dépendances React et React Router
import React from 'react';
import { Outlet } from 'react-router-dom';

// Importation des composants de navigation et pied de page
import Navbar from './Navbar';
import Footer from './Footer';

// Importation des styles CSS
import './Layout.css';

// Composant Layout : Structure principale de l'application
const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 