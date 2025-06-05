import React, { useState } from 'react';
import './AjouterPlaquePage.css'; // CSS spécifique pour cette page

function AjouterPlaquePage() {
  // États pour les valeurs sélectionnées (optionnel pour l'instant, mais utile plus tard)
  const [district, setDistrict] = useState('');
  const [territoire, setTerritoire] = useState('');
  const [secteur, setSecteur] = useState('');
  const [village, setVillage] = useState('');
  const [province, setProvince] = useState('');
  const [nationalite, setNationalite] = useState('');

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
          <select id="district" name="district" value={district} onChange={(e) => setDistrict(e.target.value)} className="select-blue">
            <option value="">Sélectionner le district</option>
            <option value="Lukaya">Lukaya</option>
          </select>
          
          <label htmlFor="territoire">Territoire</label>
          <select id="territoire" name="territoire" value={territoire} onChange={(e) => setTerritoire(e.target.value)} className="select-blue">
            <option value="">Sélectionner le territoire</option>
            <option value="Madimba">Madimba</option>
          </select>

          <label htmlFor="secteur">Secteur</label>
          <select id="secteur" name="secteur" value={secteur} onChange={(e) => setSecteur(e.target.value)} className="select-blue">
            <option value="">Sélectionner le secteur</option>
            <option value="F">F</option>
          </select>

          <label htmlFor="village">Village</label>
          <select id="village" name="village" value={village} onChange={(e) => setVillage(e.target.value)} className="select-blue">
            <option value="">Sélectionner le village</option>
            <option value="Ngeba">Ngeba</option>
          </select>

          <label htmlFor="province">Province</label>
          <select id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)} className="select-blue">
            <option value="">Sélectionner la province</option>
            <option value="Kongo-Central">Kongo-Central</option>
          </select>

          <label htmlFor="nationalite">Nationalité</label>
          <select id="nationalite" name="nationalite" value={nationalite} onChange={(e) => setNationalite(e.target.value)} className="select-blue">
            <option value="">Sélectionner la nationalité</option>
            <option value="Congolaise">Congolaise</option>
          </select>

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