import React, { useState, useEffect } from 'react';
import './AjouterPlaquePage.css'; // CSS spécifique pour cette page
import usePackageNumber from '../../hooks/usePackageNumber';
import QRCode from '../../components/QRCode';
import { ajouterPlaque } from '../../services/dbService';
import { 
  provinces, 
  getDistricts, 
  getTerritoires, 
  getSecteurs, 
  getVillages 
} from '../../data/locations';

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

  // États pour les listes déroulantes dépendantes
  const [districts, setDistricts] = useState([]);
  const [territoires, setTerritoires] = useState([]);
  const [secteurs, setSecteurs] = useState([]);
  const [villages, setVillages] = useState([]);

  // État pour les messages
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Utilisation du hook personnalisé pour la génération de numéros
  const { generateNewNumber } = usePackageNumber();
  const [numeroPlaque, setNumeroPlaque] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingNumber, setIsGeneratingNumber] = useState(false);

  // Effet pour mettre à jour les districts quand la province change
  useEffect(() => {
    if (formData.province) {
      const newDistricts = getDistricts(formData.province);
      setDistricts(newDistricts);
      if (!newDistricts.find(d => d.nom === formData.district)) {
        setFormData(prev => ({ ...prev, district: '', territoire: '', secteur: '', village: '' }));
      }
    } else {
      setDistricts([]);
    }
  }, [formData.province]);

  // Effet pour mettre à jour les territoires quand le district change
  useEffect(() => {
    if (formData.province && formData.district) {
      const newTerritoires = getTerritoires(formData.province, formData.district);
      setTerritoires(newTerritoires);
      if (!newTerritoires.find(t => t.nom === formData.territoire)) {
        setFormData(prev => ({ ...prev, territoire: '', secteur: '', village: '' }));
      }
    } else {
      setTerritoires([]);
    }
  }, [formData.province, formData.district]);

  // Effet pour mettre à jour les secteurs quand le territoire change
  useEffect(() => {
    if (formData.province && formData.district && formData.territoire) {
      const newSecteurs = getSecteurs(formData.province, formData.district, formData.territoire);
      setSecteurs(newSecteurs);
      if (!newSecteurs.find(s => s.nom === formData.secteur)) {
        setFormData(prev => ({ ...prev, secteur: '', village: '' }));
      }
    } else {
      setSecteurs([]);
    }
  }, [formData.province, formData.district, formData.territoire]);

  // Effet pour mettre à jour les villages quand le secteur change
  useEffect(() => {
    if (formData.province && formData.district && formData.territoire && formData.secteur) {
      const newVillages = getVillages(formData.province, formData.district, formData.territoire, formData.secteur);
      setVillages(newVillages);
      if (!newVillages.includes(formData.village)) {
        setFormData(prev => ({ ...prev, village: '' }));
      }
    } else {
      setVillages([]);
    }
  }, [formData.province, formData.district, formData.territoire, formData.secteur]);

  // Gestionnaire pour la génération du numéro de plaque
  const handleGenerateNumber = async () => {
    setIsGeneratingNumber(true);
    try {
      const newNumber = await generateNewNumber();
      setNumeroPlaque(newNumber);
      setShowQRCode(false);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erreur lors de la génération du numéro de plaque'
      });
    } finally {
      setIsGeneratingNumber(false);
    }
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
            {provinces.map(province => (
              <option key={province.nom} value={province.nom}>
                {province.nom}
              </option>
            ))}
          </select>

          <label htmlFor="district">District</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="select-blue"
            required
            disabled={!formData.province}
          >
            <option value="">Sélectionner le district</option>
            {districts.map(district => (
              <option key={district.nom} value={district.nom}>
                {district.nom}
              </option>
            ))}
          </select>
          
          <label htmlFor="territoire">Territoire</label>
          <select
            id="territoire"
            name="territoire"
            value={formData.territoire}
            onChange={handleChange}
            className="select-blue"
            required
            disabled={!formData.district}
          >
            <option value="">Sélectionner le territoire</option>
            {territoires.map(territoire => (
              <option key={territoire.nom} value={territoire.nom}>
                {territoire.nom}
              </option>
            ))}
          </select>

          <label htmlFor="secteur">Secteur</label>
          <select
            id="secteur"
            name="secteur"
            value={formData.secteur}
            onChange={handleChange}
            className="select-blue"
            required
            disabled={!formData.territoire}
          >
            <option value="">Sélectionner le secteur</option>
            {secteurs.map(secteur => (
              <option key={secteur.nom} value={secteur.nom}>
                {secteur.nom}
              </option>
            ))}
          </select>

          <label htmlFor="village">Village</label>
          <select
            id="village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            className="select-blue"
            required
            disabled={!formData.secteur}
          >
            <option value="">Sélectionner le village</option>
            {villages.map(village => (
              <option key={village} value={village}>
                {village}
              </option>
            ))}
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
                disabled={isGeneratingNumber}
              >
                {isGeneratingNumber ? 'Génération...' : 'Générer numéro de plaque'}
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
          disabled={isSubmitting || !numeroPlaque}
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer la plaque'}
        </button>
      </form>
    </div>
  );
}

export default AjouterPlaquePage; 