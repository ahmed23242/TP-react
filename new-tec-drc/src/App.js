// Importation des dépendances React et React Router
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';

// Importation des composants de l'application
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AjouterPlaquePage from './pages/plaques/AjouterPlaquePage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Composant principal de l'application
function App() {
  return (
    // Configuration du routeur pour la navigation
    <Router>
      <div className="App">
        <Routes>
          {/* Route publique pour la connexion avec Navbar et Footer */}
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Routes protégées qui nécessitent une authentification */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />}>
                <Route path="plaques/ajouter" element={<AjouterPlaquePage />} />
              </Route>
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