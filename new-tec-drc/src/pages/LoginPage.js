import React from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <form className="login-form-original" onSubmit={handleLogin}>
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
    </div>
  );
}

export default LoginPage; 