import React from 'react';
// import Navbar from '../components/Navbar'; // Supprimé, géré par Layout
import MainNavigationBar from '../components/MainNavigationBar';
// import Footer from '../components/Footer'; // Supprimé, géré par Layout
import './DashboardPage.css';

function DashboardPage() {
  return (
    // Le div .dashboard-page-container peut être conservé si des styles spécifiques 
    // sont appliqués à l'ensemble du contenu de cette page, sinon un Fragment <></> suffit.
    // Pour l'instant, je le laisse au cas où DashboardPage.css l'utilise.
    <div className="dashboard-page-container">
      <MainNavigationBar />
      <main className="dashboard-content">
        <h2>Bienvenue sur le tableau de bord</h2>
        <p>Sélectionnez une option dans la barre de navigation.</p>
      </main>
    </div>
  );
}

export default DashboardPage; 