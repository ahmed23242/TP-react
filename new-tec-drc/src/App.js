// Importation des dépendances React et React Router
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import './App.css';

// Importation des composants de l'application
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AjouterPlaquePage from './pages/plaques/AjouterPlaquePage';

// Composant principal de l'application
function App() {
  return (
    // Configuration du routeur pour la navigation
    <Router>
      <div className="App">
        <Routes>
          {/* Layout principal qui englobe toutes les pages */}
          <Route element={<Layout />}>
            {/* Route pour la page de connexion */}
            <Route path="/login" element={<LoginPage />} />
            {/* Route pour le tableau de bord et ses sous-routes */}
            <Route path="/dashboard" element={<DashboardPage />}>
              {/* Sous-route pour l'ajout de plaques */}
              <Route path="plaques/ajouter" element={<AjouterPlaquePage />} />
            </Route>
          </Route>
          {/* Redirection par défaut vers la page de connexion */}
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;