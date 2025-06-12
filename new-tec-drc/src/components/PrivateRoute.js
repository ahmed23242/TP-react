import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

/**
 * Composant qui protège les routes nécessitant une authentification
 */
const PrivateRoute = () => {
    // Vérifier si l'utilisateur est authentifié
    const auth = isAuthenticated();

    // Rediriger vers la page de connexion si non authentifié
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute; 