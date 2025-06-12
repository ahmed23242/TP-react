import React, { useState } from 'react';
import './AjouterPlaquePage.css'; // CSS spécifique pour cette page
import usePackageNumber from '../../hooks/usePackageNumber';
import QRCode from '../../components/QRCode';
import { ajouterPlaque } from '../../services/dbService';

function AjouterPlaquePage() {
  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    postNom: '',
    prenom: '',
    district: '',
    territoire: '',
    secteur: '',
    village: '',
    province: '',
    nationalite: '',
    adresse: '',
    telephone: '',
    email: ''
  });

  // État pour les messages
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Utilisation du hook personnalisé pour la génération de numéros
  const { currentPackageNumber, generateNewNumber } = usePackageNumber();
  const [numeroPlaque, setNumeroPlaque] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestionnaire pour la génération du numéro de plaque
  const handleGenerateNumber = () => {
    const newNumber = generateNewNumber();
    setNumeroPlaque(newNumber);
    setShowQRCode(false);
  };

  // Gestionnaire pour la génération du QR code
  const handleGenerateQRCode = () => {
    if (numeroPlaque) {
      setShowQRCode(true);
    } else {
      setMessage({ type: 'error', text: "Veuillez d'abord générer un numéro de plaque" });
    }
  };

  // Gestionnaire pour les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!numeroPlaque) {
      setMessage({ type: 'error', text: 'Veuillez générer un numéro de plaque' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Préparation des données pour la sauvegarde
      const plaqueData = {
        ...formData,
        numeroPlaque
      };

      // Sauvegarde dans la base de données
      await ajouterPlaque(plaqueData);

      // Réinitialisation du formulaire
      setFormData({
        nom: '',
        postNom: '',
        prenom: '',
        district: '',
        territoire: '',
        secteur: '',
        village: '',
        province: '',
        nationalite: '',
        adresse: '',
        telephone: '',
        email: ''
      });
      setNumeroPlaque('');
      setShowQRCode(false);
      
      setMessage({ type: 'success', text: 'Plaque ajoutée avec succès!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'ajout de la plaque: ' + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ajouter-plaque-container">
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form className="ajouter-plaque-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />

          <label htmlFor="postNom">Post-nom</label>
          <input
            type="text"
            id="postNom"
            name="postNom"
            value={formData.postNom}
            onChange={handleChange}
            required
          />

          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />

          <label htmlFor="district">District</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="select-blue"
            required
          >
            <option value="">Sélectionner le district</option>
            <option value="Lukaya">Lukaya</option>
          </select>
          
          <label htmlFor="territoire">Territoire</label>
          <select
            id="territoire"
            name="territoire"
            value={formData.territoire}
            onChange={handleChange}
            className="select-blue"
            required
          >
            <option value="">Sélectionner le territoire</option>
            <option value="Madimba">Madimba</option>
          </select>

          <label htmlFor="secteur">Secteur</label>
          <select
            id="secteur"
            name="secteur"
            value={formData.secteur}
            onChange={handleChange}
            className="select-blue"
            required
          >
            <option value="">Sélectionner le secteur</option>
            <option value="F">F</option>
          </select>

          <label htmlFor="village">Village</label>
          <select
            id="village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            className="select-blue"
            required
          >
            <option value="">Sélectionner le village</option>
            <option value="Ngeba">Ngeba</option>
          </select>

          <label htmlFor="province">Province</label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="select-blue"
            required
          >
            <option value="">Sélectionner la province</option>
            <option value="Kongo-Central">Kongo-Central</option>
          </select>

          <label htmlFor="nationalite">Nationalité</label>
          <select
            id="nationalite"
            name="nationalite"
            value={formData.nationalite}
            onChange={handleChange}
            className="select-blue"
            required
          >
            <option value="">Sélectionner la nationalité</option>
            <option value="Congolaise">Congolaise</option>
          </select>

          <label htmlFor="adresse">Adresse</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
          />

          <label htmlFor="telephone">Téléphone</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <div className="action-group">
            <label htmlFor="numeroPlaque">Numéro de plaque</label>
            <div className="number-display">
              <input 
                type="text" 
                id="numeroPlaque" 
                value={numeroPlaque} 
                readOnly 
                className="number-input"
              />
              <button 
                type="button" 
                className="action-button"
                onClick={handleGenerateNumber}
              >
                Générer numéro de plaque
              </button>
            </div>
          </div>
          <div className="action-group">
            <button 
              type="button" 
              className="action-button"
              onClick={handleGenerateQRCode}
              disabled={!numeroPlaque}
            >
              Générer le QR code
            </button>
          </div>
        </div>

        {showQRCode && numeroPlaque && (
          <div className="qrcode-section">
            <QRCode value={numeroPlaque} />
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer la plaque'}
        </button>
      </form>
    </div>
  );
}

export default AjouterPlaquePage; 