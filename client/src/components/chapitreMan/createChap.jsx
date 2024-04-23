import React, { useState } from 'react';
import './createChap.css';
import ArticlesModal from './ArticlesModal.jsx';
import ArticlesData from '../data/Articles.jsx';
import produitData from '../data/chapitreData.jsx'; 


function CreateRoleForm({ onCreateChapitre, onClose }) {
  const [chapitreName, setChapitreName] = useState(''); // Déclarer chapitreName et setChapitreName
  const [chapitres, setChapitres] = useState(produitData);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [showArticlesModal, setShowArticlesModal] = useState(false);
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);
  const [Chdata, setChdata] = useState({
    chapitre: '',
     articles : []
  });
  const [message, setMessage] = useState('');


  const handleAddArticles = (Articles) => {
    setSelectedArticles(Articles);
    setShowArticlesModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  };

//-----------
const handleCreateChapitre = () => {
    setChapitres({...chapitres, Chdata}); // Mettre à jour l'état local avec le nouveau rôle
    setShowCreateChapitreForm(false); // Masquer le formulaire de création de rôle après la création
    console.log('handleCreateChapitre'  ) ;

  };


  //---------------
  // Fonction pour basculer l'affichage du formulaire de création de chapitre
  const toggleCreateRoleForm = () => {
    setShowCreateChapitreForm(!showCreateChapitreForm);
  };
  //-------------------
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChdata({ ...Chdata, [name]: value });
  };
  //-----------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    
   
onCreateChapitre(Chdata);
  setMessage('Chapter created successfully');
  alert('Chapter created successfully');
  console.log('nouveau  chapitre  data '  , Chdata ) ; 

  };



  return (
    <form className="create-role-form" style={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}onSubmit={handleSubmit}>
      <div className="title1">Create Chapitre</div>
      <div className="form-group-create-role">
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="chapitres" className="input" style={{ paddingLeft: '20px' }}>Chapitre name:</label>
          <input
  id="chapitres"
  placeholder='enter chapter name'
  name="chapitres"
  onChange={(e) => setChdata({ ...Chdata, chapitre: e.target.value })}
  style={{
    height: '40px',
    border: 'none',
    boxShadow: 'none',
    width: '300px',
    borderRadius: '30px',
    paddingLeft: '40px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
  }}
  required
/>      </div>
        <label htmlFor="Permissions" className="input" style={{ paddingLeft: '20px' }}>Articles:</label>
        <button className="input1" type="button" onClick={() => setShowArticlesModal(true)} style={{ backgroundColor: 'white', textDecoration: "none ", boxShadow: "none" }}>Choose Articles</button>

        {showArticlesModal && (
          <ArticlesModal
          Articles={ArticlesData}
            selectedArticles={selectedArticles}
            onClose={() => setShowArticlesModal(false)}
            onAddArticles={handleAddArticles}
          />
        )}

        <div className='btns'>
          <button type="button" onClick={onClose} className='cancel btn'>Cancel</button>
          <button type="submit" onChange={handleCreateChapitre}  className='create btn'>Create Chapitre</button>
        </div>
      </div>
    </form>
  );
}

export default CreateRoleForm;