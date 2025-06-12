import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar'; // Supprimé, géré par Layout
import MainNavigationBar from '../components/MainNavigationBar';
// import Footer from '../components/Footer'; // Supprimé, géré par Layout
import { getAllPlaques } from '../services/dbService';
import './DashboardPage.css';

function DashboardPage() {
  const [plaques, setPlaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaques = async () => {
      try {
        const data = await getAllPlaques();
        setPlaques(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des plaques');
        setLoading(false);
      }
    };

    fetchPlaques();
  }, []);

  return (
    // Le div .dashboard-page-container peut être conservé si des styles spécifiques 
    // sont appliqués à l'ensemble du contenu de cette page, sinon un Fragment <></> suffit.
    // Pour l'instant, je le laisse au cas où DashboardPage.css l'utilise.
    <div className="dashboard-page-container">
      <MainNavigationBar />
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Tableau de bord</h1>
        </div>

        <div className="plaques-list-container">
          {loading ? (
            <div className="loading">Chargement des plaques...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <h2>Liste des plaques enregistrées</h2>
              <div className="table-container">
                <table className="plaques-table">
                  <thead>
                    <tr>
                      <th>Numéro de plaque</th>
                      <th>Nom</th>
                      <th>Post-nom</th>
                      <th>Prénom</th>
                      <th>District</th>
                      <th>Territoire</th>
                      <th>Date de création</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plaques.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="no-data">
                          Aucune plaque enregistrée
                        </td>
                      </tr>
                    ) : (
                      plaques.map((plaque) => (
                        <tr key={plaque.numeroPlaque}>
                          <td>{plaque.numeroPlaque}</td>
                          <td>{plaque.nom}</td>
                          <td>{plaque.postNom}</td>
                          <td>{plaque.prenom}</td>
                          <td>{plaque.district}</td>
                          <td>{plaque.territoire}</td>
                          <td>{new Date(plaque.dateCreation).toLocaleDateString()}</td>
                          <td>
                            <button className="action-btn view-btn">
                              Voir
                            </button>
                            <button className="action-btn print-btn">
                              Imprimer
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default DashboardPage; 