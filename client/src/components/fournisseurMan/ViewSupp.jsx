// CreateUserForm.jsx
import React, { useState, useEffect } from 'react';

function ViewSupplier({ onClose }) {
  const [SupplierData, setSupplierData] = useState({
    nom: 'Sarl PC STORE',
    email: 'N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes',
    phone: '048-74-14-52',
    nrc: '22/00 - 0087099 C05',
    nif: '000622002307741',
    rib: '773 0568 301 587 12 BNA SBA',
  }); 



  const [userData, setUserData] = useState(SupplierData) 


  const handleSubmit = (event) => {
    event.preventDefault();
    if(userData!=SupplierData) {
      const  confirm = window.confirm('do  you  want  to  save changes ')
      if (confirm) {
          // Vérification si tous les champs requis sont remplis
    const isFormValid = Object.values(userData).every(value => value.trim() !== '');
    
    if (!isFormValid) {
      alert('Veuillez remplir tous les champs avant de créer le fournisseur.');
      return; // Arrêter l'exécution de la fonction si le formulaire n'est pas valide
    }
  
    // Si le formulaire est valide, continuer avec la création du fournisseur
    console.log('Nouvelles données du fournisseur :', userData);
    alert('Fournisseur modifié avec succès.');
    setSupplierData(userData) ;
  
    // Réinitialiser les données du formulaire après la création
    setUserData({
      nom: '',
      email: '',
      phone: '',
      nrc: '',
      nif: '',
      rib: '',
    });
    onClose() ;

      }
      else{
      onClose() ;


}
    }
    else {
    onClose() ;
  }
  
  };
  
 

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      borderRadius: '30px',
      boxShadow: '0 2px 5px #100B39',
      width: '600px',
      height: '600px', // Modifiez la hauteur ici si nécessaire
      padding: '20px',
      zIndex: '103', // z-index n'a pas besoin de #
    }}
    >

    <form onSubmit={handleSubmit}>

      <input
            style={{
              display: 'flex' ,
              alignItems: 'center' ,
              width: '470px' ,
              height: '40px' ,
              padding: '20px ' ,
              color: '#5B548E',
              border: 'none'
             }}
              className='title1'
            type="text"
            id="username"
            name="nom"
            value={userData.nom}
            required    />
        

        <div>
          
        </div>
           <div style={{  marginLeft: '50px'   ,    color: '#616262' ,fontSize:'14px',  color:'#5B548E'  , fontSize :'16px'}}> Nom ou raison sociale: </div>
           <input
            style={{
              display: 'flex' ,
              alignItems: 'center' ,
              width: '470px' ,
              height: '40px' ,
              borderRadius: '17px' ,
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
              padding: '20px ' ,
              color: 'black' ,}}
            type="text"
            id="username"
            name="nom"
            value={userData.nom}
            onChange={(e) => setUserData({ ...userData, nom: e.target.value })}
            required    />
        

        <div style={{  marginLeft: '50px'   ,    color: '#616262' ,fontSize:'14px',  color:'#5B548E'  , fontSize :'16px'}}> Adresse email: </div>
           <input
            style={{
              display: 'flex' ,
              alignItems: 'center' ,
              width: '470px' ,
              height: '40px' ,
              borderRadius: '17px' ,
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
              padding: '20px ' ,
              color: 'black' ,}}
            type="email"
            id="username"
            name="username"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required    />


<div style={{  marginLeft: '50px'   ,    color: '#616262' ,fontSize:'14px',  color:'#5B548E'  , fontSize :'16px'}}> Téléphone et Fax: </div>
           <input
            style={{
              display: 'flex' ,
              alignItems: 'center' ,
              width: '470px' ,
              height: '40px' ,
              borderRadius: '17px' ,
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
              padding: '20px ' ,
              color: 'black' ,}}
            type= 'text'
            id="username"
            name="username"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            required    />







<div style={{  marginLeft: '50px'   ,    color: '#616262' ,fontSize:'14px',  color:'#5B548E'  , fontSize :'16px'}}> N° R.C: </div>
           <input
            style={{
              display: 'flex' ,
              alignItems: 'center' ,
              width: '470px' ,
              height: '40px' ,
              borderRadius: '17px' ,
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
              padding: '20px ' ,
              color: 'black' ,}}
            type="text"
            id="username"
            name="username"
            value={userData.nrc}
            onChange={(e) => setUserData({ ...userData, nrc: e.target.value })}
            required    />





<div style={{  marginLeft: '50px'   ,    color: '#616262' ,fontSize:'14px',  color:'#5B548E'  , fontSize :'16px'}}> numéro d'identification fiscale (NIF): </div>
           <input
            style={{
              display: 'flex' ,
              alignItems: 'center' ,
              width: '470px' ,
              height: '40px' ,
              borderRadius: '17px' ,
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
              padding: '20px ' ,
              color: 'black' ,}}
            type="text"
            id="username"
            name="username"
            value={userData.nif}
            onChange={(e) => setUserData({ ...userData, nif: e.target.value })}
            required    />


<div style={{  marginLeft: '50px'   ,    color: '#616262' ,fontSize:'14px',  color:'#5B548E'  , fontSize :'16px'}}> RIB (ou RIP): </div>
           <input
            style={{
              display: 'flex' ,
              alignItems: 'center' ,
              width: '470px' ,
              height: '40px' ,
              borderRadius: '17px' ,
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
              padding: '20px ' ,
              color: 'black' ,}}
            type="text"
            id="username"
            name="username"
            value={userData.rib}
            onChange={(e) => setUserData({ ...userData, rib: e.target.value })}
            required    /> 

          <div className='btns' style={{marginTop : "10px"  }}>      
        <button  onClick={handleSubmit} className='create btn' style={{width:'100% '}}>OK </button>
        </div>  
    </form>
    </div>

  );
}

export default ViewSupplier;
