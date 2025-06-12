import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');

    const user = login(matricule, password);
    if (user) {
      navigate('/dashboard');
    } else {
      setError('Matricule ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form-original" onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-row">
          <label htmlFor="matricule">Matricule</label>
          <input 
            type="text" 
            id="matricule" 
            name="matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Mot de passe</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      
      {/* Information sur les utilisateurs de test (discrètement affichée) */}
      <div className="test-users-info">
        <p>Comptes de test :</p>
        <ul>
          <li>ADMIN123 / admin123</li>
          <li>USER456 / user456</li>
        </ul>
      </div>
    </div>
  );
}

export default LoginPage; 