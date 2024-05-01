
import React, { useState } from 'react';

function DechargeComp({ filteredProducts, onAddCmd }) {
  const [selectedPro, setSelectedPro] = useState('');
   const [NumSairie, setNumSairie] = useState('');
  const [NumInventaire, setNumInventaire] = useState('');
  const [Observations, setObservations] = useState(''); 
  const [quantity, setQuantity] = useState('');
  const [quantityAcc, setQuantityAcc] = useState('');

  const productOnChange = (e) => {
    setSelectedPro(e.target.value);
    setNumInventaire(filteredProducts.find((product)=> (
      product.selectedPro==e.target.value
    )).NumInventaire);
    setQuantity(filteredProducts.find((product)=> (
      product.selectedPro==e.target.value
    )).quantity);
  };

  const NumSairieOnChange = (e) => {
    setNumSairie(e.target.value);
  };
  const ObservationsOnChange = (e) => {
    setObservations(e.target.value);
  };
 

  const quantityOnChange = (e) => {
    setQuantityAcc(e.target.value);
  };

  const handleAddCmd = () => {
    if (selectedPro &&   NumSairie!='' && Observations !='' && quantityAcc !=''){
      // Créer un objet de données de commande
      if (quantityAcc>0)
     { const cmdData = {
        id: Math.floor(Math.random() * 10000), // Générer un identifiant unique pour la commande
        selectedPro: selectedPro,
        NumSairie:NumSairie,
        NumInventaire:NumInventaire,
        Observations:Observations,
        quantityAccordée :quantityAcc ,
        quantityDemandée :quantity ,
      }; 
      // Passer les données de la commande à la fonction de gestion de l'ajout
      onAddCmd(cmdData);
console.log('cmdData',cmdData) ; 
      // Réinitialiser les champs
      setSelectedPro('');
      setNumSairie('');
      setQuantity('') ;
      setQuantityAcc('') ;
      setNumInventaire('');
      setObservations('')}
      else{
        alert('Quantity must  be  Strictly Positive.');
      }
     }
        else {
            alert('Please fill in all fields.');
        }
  };
  




return (
  <div  style={{display :'flex' , gap :'10px',marginLeft :'-50px' , marginTop :'40px'}}>
      <div  style={{display :'flex' ,  gap:'10px'}}>  
           <select onChange={productOnChange} value={selectedPro}
              style={{ color: '#5B548E',boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)'  , height :'35px' , marginBottom :'30px' ,padding :'0px' , paddingLeft :'20px' }}>
      <option value="">Products</option>
      {filteredProducts.map((product, i) => (
                <option key={i} value={product.selectedPro}>{product.selectedPro}</option>
              ))}
    </select>

    <input   placeholder="N° Inventaire"  value={NumInventaire}
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
  paddingLeft:'20px'
}}      />

<input   placeholder="Q.Demandé"  value={quantity}
 style={{
  color: '#5B548E',
  borderRadius: '20px',
  height: '35px',
  width: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
  border :'none',
  border: '1px solid grey', 
  paddingLeft:'10px'
}}      />


    <input onChange={quantityOnChange} value={quantityAcc} type="number" placeholder="Q.Accordé" 
     style={{
      color: '#5B548E',
      borderRadius: '20px',
      height: '35px',
      width: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', 
      boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
      border :'none',
      border: '1px solid grey', 
      paddingLeft:'10px'
    }}
    />



<input   placeholder="N° Serie" onChange={NumSairieOnChange} value={NumSairie}
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
  paddingLeft:'30px'
}}      />


<input    placeholder="Observations" onChange={ObservationsOnChange} value={Observations}
 style={{
  color: '#5B548E',
  borderRadius: '20px',
  height: '35px',
  width: '170px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
  border :'none',
  border: '1px solid grey', 
  paddingLeft:'20px'
}}
      />

    </div>
 
    <button onClick={handleAddCmd}
     style={{
      borderRadius: '20px',
      height: '35px',
      width: '80px' ,
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
export default DechargeComp;