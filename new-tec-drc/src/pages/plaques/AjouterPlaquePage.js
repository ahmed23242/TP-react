import React from 'react';
import './AjouterPlaquePage.css'; // CSS spécifique pour cette page

function AjouterPlaquePage() {
  // Logique pour gérer les changements de formulaire et la soumission viendra ici

  return (
    <div className="ajouter-plaque-container">
      <form className="ajouter-plaque-form">
        <div className="form-grid">
          {/* Rangée 1 */}
          <label htmlFor="nom">Nom</label>
          <input type="text" id="nom" name="nom" />

          {/* Rangée 2 */}
          <label htmlFor="postNom">Post-nom</label>
          <input type="text" id="postNom" name="postNom" />

          {/* Rangée 3 */}
          <label htmlFor="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" />

          {/* Rangée 4 - Sélecteurs customisés */}
          <label htmlFor="district">District</label>
          <div className="custom-select-button">Sélectionner le district <span className="select-badge">20</span></div>
          
          <label htmlFor="territoire">Territoire</label>
          <div className="custom-select-button">Sélectionner le territoire <span className="select-badge">20</span></div>

          <label htmlFor="secteurVillage">Secteur</label> {/* Nom ajusté pour clarté */} 
          <div className="custom-select-button">Sélectionner le secteur <span className="select-badge">20</span></div>

          <label htmlFor="village">Village</label>
          <div className="custom-select-button">Sélectionner le village <span className="select-badge">20</span></div> {/* Texte ajusté "village" */} 

          <label htmlFor="province">Province</label>
          <div className="custom-select-button">Sélectionner la province <span className="select-badge">20</span></div> {/* Texte ajusté "province" */} 

          <label htmlFor="nationalite">Nationalité</label>
          <div className="custom-select-button">Sélectionner la nationalité <span className="select-badge">20</span></div> {/* Texte ajusté "nationalité" */} 

          {/* Rangée 5 - Champs texte classiques */}
          <label htmlFor="adresse">Adresse</label>
          <input type="text" id="adresse" name="adresse" />

          <label htmlFor="telephone">Téléphone</label>
          <input type="text" id="telephone" name="telephone" />

          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" name="email" />
        </div>

        <div className="form-actions">
          <div className="action-group">
            <label htmlFor="numeroPlaque">Numéro de plaque</label>
            <button type="button" className="action-button">Générer numéro de plaque</button>
          </div>
          <div className="action-group">
            {/* Espace pour aligner le deuxième bouton, ou on pourrait utiliser un label vide */} 
            <button type="button" className="action-button">Générer le code-barre</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AjouterPlaquePage; 