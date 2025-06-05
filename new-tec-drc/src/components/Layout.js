import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css'; // Importer le CSS pour Layout
// Optionnel: Importer un fichier CSS pour Layout si des styles spécifiques sont nécessaires
// import './Layout.css'; 

function Layout() {
  return (
    <>
      <Navbar />
      <main className="main-content-area">
        <Outlet /> {/* C'est ici que le contenu de la page actuelle sera rendu */}
      </main>
      <Footer />
    </>
  );
}

export default Layout; 