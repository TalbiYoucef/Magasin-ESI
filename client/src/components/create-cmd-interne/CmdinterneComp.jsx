// CmdComp.js

import React, { useState } from 'react';

function CmdCompInterne({ filteredProducts, onAddCmd }) {
  const [selectedPro, setSelectedPro] = useState('');
  const [quantity, setQuantity] = useState('');
  const [Prix, setPrix] = useState('');

 
  const productOnChange = (e) => {
    setSelectedPro(e.target.value);
  };

  const quantityOnChange = (e) => {
    setQuantity(e.target.value);
  };
  const PrixOnChange = (e) => {
    setPrix(e.target.value);
  };

  const handleAddCmd = () => {
    if (selectedPro && quantity) {
      // Créer un objet de données de commande
      if (quantity> 0) {
        
      const cmdData = { // Générer un identifiant unique pour la commande
        selectedPro: selectedPro,
        quantity: quantity
      };

      // Passer les données de la commande à la fonction de gestion de l'ajout
      onAddCmd(cmdData);

      // Réinitialiser les champs
      setSelectedPro('');
      setQuantity('');
      setPrix('') ;
    
  }
    else{
      alert('Quantity must be strictly  positive ');

    }}
        else {
            alert('Please fill in all fields.');
        }
  ;}

  return (
    <div  style={{display :'flex' ,  gap :'60px', marginTop :'40px',marginLeft :'30px'}}>
        <div  style={{display :'flex' ,  gap:'40px'}}>  
             <select onChange={productOnChange} value={selectedPro}
                style={{ color: '#5B548E',boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)'  , height :'35px' , marginBottom :'30px' ,padding :'0px' , paddingLeft :'20px' }}>
        <option value="">Products</option>
        {filteredProducts.map((produit, index) => (
          <option key={index} value={produit.name}>
            {produit.name}
          </option>
        ))}
      </select>
      <input onChange={quantityOnChange} value={quantity} type="number" placeholder="Quantité" 
       style={{
        color: '#5B548E',
        borderRadius: '20px',
        height: '35px',
        width: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
        border :'none',
        border: '1px solid grey', 
        paddingLeft:'40px'
      }}
      />



      </div>
   
      <button onClick={handleAddCmd}
       style={{
        borderRadius: '20px',
        height: '35px',
        width: '100px' ,
        paddingRight :'10px', 
        display: 'flex',
        alignItems: 'center',
        textDecoration :"none",
        backgroundColor :'#17BF6B',
        justifyContent: 'center', 
        color :'white',
        border :'none'

      }}
      
      >+Add</button>
    </div>
  );
}

export default CmdCompInterne;
