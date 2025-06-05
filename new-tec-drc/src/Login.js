import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <form className="login-form-original">
        <div className="form-row">
          <label htmlFor="matricule">Matricule</label>
          <input type="text" id="matricule" name="matricule" />
        </div>
        <div className="form-row">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      
      {/* Le Footer est maintenant un composant séparé et sera rendu dans App.js */}
    </div>
  );
}

export default Login;
