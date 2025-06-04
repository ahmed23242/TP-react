import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="window-bar">
        <div className="window-buttons">
          <span className="window-btn" />
          <span className="window-btn" />
          <span className="window-btn" />
        </div>
      </div>
      <div className="header">
        <div>
          <span className="app-title">App  NEW TEC DRC</span>
          <div className="ministry">
            République Démocratique  du Congo<br />
            Ministère de Transport
          </div>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_the_Democratic_Republic_of_the_Congo.svg"
          alt="DRC Flag"
          className="flag"
        />
      </div>
      <form className="login-form">
        <label>
          Matricule
          <input type="text" />
        </label>
        <label>
          Mot de passe
          <input type="password" />
        </label>
        <button type="submit">Se connecter</button>
      </form>
      <div className="footer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Coat_of_arms_of_the_Democratic_Republic_of_the_Congo.svg"
          alt="DRC Emblem"
          className="emblem"
        />
        <div className="copyright">
          Copyright © 2024. Tous droits réservés.
        </div>
      </div>
    </div>
  );
}

export default Login; 