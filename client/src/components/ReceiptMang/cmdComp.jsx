// CmdComp.js

import React, { useState } from 'react';

function CmdComp({ filteredProducts, onAddCmd }) {
  const [selectedPro, setSelectedPro] = useState('');
  const [quantity, setQuantity] = useState('');
  
  const productOnChange = (e) => {
    setSelectedPro(e.target.value);
  };

  const quantityOnChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddCmd = () => {
    if (selectedPro && quantity) {
      // Créer un objet de données de commande
      if (quantity> 0) {

      const cmdData = {
        id: Math.floor(Math.random() * 10000), // Générer un identifiant unique pour la commande
        selectedPro: selectedPro,
        quantity: quantity
      };

      // Passer les données de la commande à la fonction de gestion de l'ajout
      onAddCmd(cmdData);

      // Réinitialiser les champs
      setSelectedPro('');
      setQuantity('');
    }  else {
        alert('quantity must be strictly  positive ');

    }}
        else {
            alert('Please fill in all fields.');
        }
  };
  

  return (
    <div  style={{display :'flex' ,  gap :'50px', marginTop :'40px'}}>
        <div  style={{width:'60%', backgroundColor:'white',marginLeft:'6%',marginBottom:'2%',display :'flex' ,  gap:'200px'}}>  
        <div className="pro30" style={{width: '100%'}} >
             <p style={{ color :'#5B548E' , fontSize :'20px' ,marginLeft:'60px', marginTop :'20px'}}> Product :</p>
             <select onChange={productOnChange} value={selectedPro}
                style={{width: '100%', padding: '5px',   paddingLeft: '20px',  height: '45px', marginLeft: '5%',backgroundColor: 'white', borderRadius: '30px', boxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', WebkitBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',MozBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',border: 'none',color: 'rgba(58,53,65,0.87)'}}>
        <option value="">Products</option>
              {filteredProducts.map((product, i) => (
                <option key={i} value={product.nommP}>{product.nommP}</option>
              ))}
      </select>
      </div>
      <div className="quan30" style={{width: '30%'}}>
      <p style={{ color :'#5B548E' , fontSize :'20px' ,marginLeft:'20px', marginTop :'20px'}}>quantity:</p>
      <input onChange={quantityOnChange} value={quantity} type="number" placeholder="Quantité" 
       style={{width: '100%', padding: '5px',   paddingLeft: '20px',  height: '45px', marginLeft: '5%',backgroundColor: 'white', borderRadius: '30px', boxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', WebkitBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',MozBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',border: 'none',color: 'rgba(58,53,65,0.87)'}}
      />
      </div>
      
   
      <button onClick={handleAddCmd}
       style={{
        borderRadius: '20px',
        height: '35px',
        width: '120px' ,
        paddingRight :'10px', 
        display: 'flex',
        alignItems: 'center',
        textDecoration :"none",
        backgroundColor :'#17BF6B',
        justifyContent: 'center', 
        color :'white',
        border :'none',
        marginTop:'70px'

      }}
      
      >+Add</button>
      </div>
    </div>
  );
}

export default CmdComp;