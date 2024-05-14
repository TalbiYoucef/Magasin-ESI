// CmdComp.js

import React, { useState } from 'react';

function CmdCompInterne({ filteredProducts, onAddCmd }) {
  const [quantity, setQuantity] = useState('');
  const [name, setname] = useState(filteredProducts.name);

  const [Prix, setPrix] = useState('');

 

  const quantityOnChange = (e) => {
    setQuantity(e.target.value);
  };


  const handleAddCmd = () => {
    if ( quantity) {
      // Créer un objet de données de commande
      if (quantity> 0) {
        
      const cmdData = {
        id: filteredProducts.product_id, // Utilisez une clé unique du produit filtré
        quantity: quantity ,
        name :filteredProducts.name 
      };

      // Passer les données de la commande à la fonction de gestion de l'ajout
      onAddCmd(cmdData);
      // Réinitialiser les champs
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
    <div  style={{display :'flex' ,  gap :'60px', marginTop :'40px',marginLeft :'60px'}}>
        <div  style={{display :'flex' ,  gap:'40px'}}>  
          <div
       style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    paddingLeft :'40px'
                  }} >
        {filteredProducts.name}
      
      
      </div>
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
