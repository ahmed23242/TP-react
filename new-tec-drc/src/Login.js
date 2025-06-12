// Importation des dépendances nécessaires
import React from "react";
import "./Login.css";

// Composant de la page de connexion
function Login() {
  return (
    // Conteneur principal du formulaire de connexion
    <div className="login-container">
      {/* Formulaire de connexion avec style original */}
      <form className="login-form-original">
        {/* Champ pour le matricule */}
        <div className="form-row">
          <label htmlFor="matricule">Matricule</label>
          <input type="text" id="matricule" name="matricule" />
        </div>
        {/* Champ pour le mot de passe */}
        <div className="form-row">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" />
        </div>
        {/* Bouton de soumission du formulaire */}
        <button type="submit">Se connecter</button>
      </form>
      
      {/* Le Footer est maintenant un composant séparé et sera rendu dans App.js */}
    </div>
  );
}

export default Login;
