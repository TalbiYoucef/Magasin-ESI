import React, { useState  , useEffect} from 'react';


import ArticlesData from '../data/Articles.jsx';
import produitData from '../data/chapitreData.jsx'; // data of chapitres
import produit from '../data/Produit.jsx'; // data of produits





function CreateRoleForm({ onCreateChapitre, onClose }) {
  const [chapitreName, setChapitreName] = useState(''); // Déclarer chapitreName et setChapitreName
  const [articles, setArticles] = useState(produit);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [selectedProduits, setSelectedProduits] = useState([]);
  const [showArticlesModal, setShowArticlesModal] = useState(false);
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);
  const [Chdata, setChdata] = useState({
    name: '',
    description: '',
    quantity: '',
  });
  const [message, setMessage] = useState('');


  const handleAddProduits = (produits) => {
    setSelectedProduits(produits);
    console.log('Chdata ///produit',Chdata)

    console.log('create ///produit',produits)
    setShowArticlesModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  };
  

//--------------------
const handleQuantityChange = (e) => {
  setChdata({ ...Chdata, quantity: e.target.value })
  const quantity = parseInt(e.target.value); // Convertir la valeur en nombre entier
  if (quantity < 0) {
      alert('La quantité ne peut pas être négative !');
     
  }
 
};


//-----------
const handleCreateArticle = (newprod) => {
  //  setArticles({...articles, Chdata}); // Mettre à jour l'état local avec le nouveau rôle
    const newProduitId = articles.length.toString();
    const ProduitToAdd = {
      id: newProduitId,
      ...newprod
    };
    setArticles(prevRoles => [...prevRoles, ProduitToAdd]);
  
    setShowCreateChapitreForm(false); // Masquer le formulaire de création de rôle après la création
    console.log('handleCreateArticle'  ) ;

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
  setMessage('produit created successfully');
  alert('produit created successfully');
  console.log('nouveau  produit  data '  , Chdata ) ; 

  setChdata({
    name: '',
    description: '',
    quantity: '',
  });

  };



  return (
    <form className="createRoleForm" style={styles.createRoleForm}onSubmit={handleSubmit}>
      <div className="title1"  style={styles.title1}>Create Produit</div>
      <div className="formGroupCreateRole"  style={styles.formGroupCreateRole}>
        <div className='ch' style={styles.ch}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="articles" className="input" style={styles.input}>Produit name:</label>
          <input id="articles"
                 placeholder='enter produit name'
                name="articles"
                onChange={(e) => setChdata({ ...Chdata, name: e.target.value })}
                style={styles.input1}
               required
/>      </div>
        
       <div style={{ marginBottom: '20px' }}>
          <label htmlFor="articles" className="input" style={styles.input}>Produit description:</label>
          <textarea 
        id="articles"
        placeholder='enter produit description'
        name="articles"
        value={Chdata.description} // Assurez-vous de lier la valeur du champ à l'état Chdata
        onChange={(e) => setChdata({ ...Chdata, description: e.target.value })}
        style={{
          minWidth: '490px', 
            maxWidth: '490px', // Utilisez la variable pour définir la largeur
            height:'200px',
            padding:'10px',
            paddingRight:'20px',
            resize: 'none',
            border: 'none',
            paddingLeft: '15px',
            borderRadius: '30px',
            transition: 'border-color 0.3s ease',
            color: '#656e77',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '15px',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
            marginBottom: '10px',
            wordWrap: 'break-word', // Permet le retour à la ligne automatique
            overflowWrap: 'break-word', 
        }}
        required 
    />
     </div>
<div style={{ marginBottom: '20px' }}>
          <label htmlFor="articles" className="input" style={styles.input}>Produit quantity:</label>
          <input id="articles"
                 placeholder='enter quantity produit'
                name="articles"
                onChange={handleQuantityChange}
                style={styles.input1}
               required
/>      </div>
        
            </div>

       
        <div className='btns' style={styles.btns} >
          <button type="button" onClick={onClose} className='cancel' style={styles.cancel}>Cancel</button>
          <button type="submit" onChange={handleCreateArticle}  className='create' style={styles.create}>Create Produit</button>
        </div>
      </div>
    </form>
  );
};
const styles = {
  createRoleForm: {
    width: '100%',
    height: '900px',
    borderRadius: '30px',
    marginTop: '-17%',
    marginLeft: '-20px',
    backgroundColor:'white',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)', 
    

  },
  formGroupCreateRole: {
    height: '300px',
    width: '80%',
    marginLeft:'70px',
  
  },
  input: {
    paddingLeft: '20px',
    display: 'block',
    color: '#5B548E',

  },
  input1: {
    width: '490px',
    height: '40px',
    paddingLeft: '15px',
    borderRadius: '30px',
    transition: 'border-color 0.3s ease',
    color: '#656e77',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500, // medium
    fontSize: '15px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
    marginBottom: '10px',
    border:'none',
    
  },
  title1: {
    marginTop:'20px',
    color: '#5B548E',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600, // Semi-bold
    fontSize: '25px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  btn: {
    textDecoration: 'none',
    width: '130px',
    height: '40px',
    borderRadius: '15px',
    marginTop: '30px',
    transition: 'border-color 0.3s ease',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500, // medium
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    textAlign: 'center',
    marginRight: '1rem',
  },
  create: {
    backgroundColor: '#0047FF',
    color: 'white',
    border: '1px solid #F0F4F6',
    borderRadius: '20px',
    width: '200px',
    height: '45px',
    marginTop:'30px'

  },
  cancel: {
    color: '#0047FF',
    backgroundColor: 'white',
    border: '1px solid #0047FF',
    borderRadius: '20px',
    width: '200px',
    height: '45px',
    marginTop:'30px',
    
    
  },
  btns: {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    gap:'20px'
  },
  ch:{
    marginLeft:'60px'
  }
};



export default CreateRoleForm;