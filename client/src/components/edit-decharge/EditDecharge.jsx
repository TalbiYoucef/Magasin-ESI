// CreateCmd.js
import React, { useState ,useEffect } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import { Link } from 'react-router-dom';
import DechargeComp from './DechargeComp';

function EditDecharge() {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [Products, setProducts] = useState([]);
    const [UserService, setUserService] = useState('comité des oeuvres sociales ');
    const [Dichargedate, setDichargedate] = useState(' 15/02/2024 ');


    const [Decharge, setDecharge] = useState({
      products: [
        { id: 0, selectedPro: 'Vidéo projecteur EPSON', NumSerie: 'WS-C2924M-XL-EN',quantiteDemande :'60'  ,quantityServie :'15' , NumInventaire: 'MAV-01-2023', Observations: 'observation' },
        { id: 1, selectedPro: '123  ', NumSerie: '123', quantiteDemande :'123'  ,quantityServie :'123' ,NumInventaire: '123', Observations: '123' },
        { id: 2, selectedPro: 'Impr imante HP LaserJet', NumSerie: 'DEF789012',quantiteDemande :'80'  ,quantityServie :'1566' , NumInventaire: 'INV9012', Observations: 'observations' },
      ]
    });
    const [NumInventaire, setNumInventaire] = useState(Decharge.products.map(product => product.NumInventaire));
    const [Observations, setObservations] = useState(Decharge.products.map(product => product.Observations));
    const [quantityServie, setQuantityServie] = useState(Decharge.products.map(product => product.quantityServie));// Quantite Servie
    const [numSerie, setNumSerie] =  useState(Decharge.products.map(product => product.NumSerie));

    const quantityservOnChange = (index, e) => {
      const updatedQuantityServie = [...quantityServie];
      updatedQuantityServie[index] = e.target.value;
      setQuantityServie(updatedQuantityServie);
    };

    const ObservationsOnChange = (index, e) => {
      const updatedObservations = [...Observations];
      updatedObservations[index] = e.target.value;
      setObservations(updatedObservations);
    };
    
    const NumSerieOnChange = (index, e) => {
      const updatedNumSerie = [...numSerie];
      updatedNumSerie[index] = e.target.value;
      setNumSerie(updatedNumSerie);
    };


    const handleSave = (id, value, value2, value3 , value4) => {
      // Vérifier si les valeurs sont présentes et correctes
      if (value && value2 && value3 && value4) {
          // Vérifier si la quantité est strictement positive
          if (value > 0) {
              // Afficher une boîte de dialogue de confirmation
              const confirmSave = window.confirm("Are you sure you want to save the changes?");
              
              // Vérifier si l'utilisateur a confirmé l'enregistrement
              if (confirmSave) {
                  // Mettre à jour la liste des données de commande
                  setCmdDataList(cmdDataList.map(cmdData => {
                      if (cmdData.id === id) {
                          alert('infos  updated successfully');
                          return { ...cmdData, quantityServie: value, NumInventaire: value2, Observations: value3 ,NumSerie :  value4   };
                      }
                      return cmdData;
                  }));
              }
          } else {
              alert('Quantity must be strictly positive');
          }
      } else {
          alert('Please fill in all the fields');
      }
      console.log('handleSave: cmdDataList', cmdDataList);

  };
  
    const [cmdDataList, setCmdDataList] = useState(Decharge.products);
   const [Sortie, setSortie] = useState({//les infos retournées du  bon  de sortie 
      products: [
        { id: 3, selectedPro: 'Scanner Epson Perfection V600', NumSerie: 'GHI345678',quantiteDemande :'10'  ,quantityServie :'1115' , NumInventaire: 'INV3456', Observations: 'observations' },
        { id: 4, selectedPro: 'Casque audio Bose QuietComfort 35 II',  quantiteDemande :'20'  , NumInventaire: 'INV7890', Observations: 'observations' },
        { id: 5, selectedPro: 'Souris Logitech MX Master 3',  quantiteDemande :'30'  ,  NumInventaire: 'INV1234', Observations: 'observations' },
        { id: 6, selectedPro: 'Produit 1', quantiteDemande :'40'  ,  NumInventaire: 'INV1234', Observations: 'observations' }
   ]
  });
  const [filteredProducts, setFilteredProducts] = useState(Sortie.products.filter(product => product.selectedPro !== Decharge.selectedPro));
    
    const handleAddCmd = (cmdData ) => {
      setCmdDataList([...cmdDataList,cmdData]);
      setFilteredProducts(filteredProducts.filter(product => product.selectedPro !== cmdData.selectedPro));
    };

    const handleRemoveCmd = (id) => {
      setCmdDataList(cmdDataList.filter(cmdData => cmdData.id !== id)); 
      const removedCmd = cmdDataList.find(cmdData => cmdData.id === id);
      if (removedCmd) {
        setFilteredProducts([...filteredProducts,removedCmd  ]);
      }
    };



    const handleConfirmCommand = () => {
        const confirm = window.confirm("Are you sure you want to Confirm the Discharge note?");
        if (confirm) {
          if (cmdDataList.length>0)
       {  
        const commandeInfo = {
            Service: UserService,
            date: Dichargedate,
            products: cmdDataList.map(cmd => ({
                idp: cmd.id,
                nommP: cmd.selectedPro,
                NumSerie:cmd.NumSerie,
                NumInventaire:cmd.NumInventaire,
                Observations:cmd.Observations    
                      }))
        };
        console.log('commandeInfo:', commandeInfo);
      //  window.location.href =  '/List des  demandes de fourniture  de ce user '; 

    } else{
        alert('please fill in all  the fileds Correctly ')
    }  }  };

    const handleCancel = () => {
        const confirm = window.confirm("Are you sure you want to cancel the Form?");
        if (confirm) {
         setCmdDataList([]);
        setFilteredProducts([]);
        setProducts([]);
             //   window.location.href =  '/List des  demandes de fourniture  de ce user '; 


    };}

    const handleCmdList= () => {
        const confirm = window.confirm("Are you sure you want to Leave this form ?");
        if (confirm) {
          setCmdDataList([]);
        setFilteredProducts([]);
        setProducts([]);
     
           // window.location.href =  '/List des  demandes de fourniture  de ce user '; 
        }
        };



        useEffect(() => {
          // Obtenez les valeurs initiales des produits existants dans la liste
          const initialQuantity = cmdDataList.map(cmdData => cmdData.quantityServie);
          const initialNumSerie = cmdDataList.map(cmdData => cmdData.NumSerie);
          const initialObservations = cmdDataList.map(cmdData => cmdData.Observations);
          
          // Mettez à jour les états initiaux
          setQuantityServie(initialQuantity);
          setNumSerie(initialNumSerie);
          setObservations(initialObservations);
      }, [cmdDataList]);
      
  
  
  
    const today = new Date().toLocaleDateString('fr-FR');
return (
    <div> 
      <Nav />
      <div className='dwnusers'>
        <Side    link='commands'/>    
        <div   style={{ marginTop :"8vh" , marginLeft :' 7%' , width :'90%', height :'92vh' , padding :'60px'}}   >
                <div className='crcmd1' style={{display :'flex ' , alignItems: 'center', justifyContent:  'space-between'  , gap : '200px' , marginBottom :'30px' }}>
                   <div style={{ display :'flex ' , gap : '20px'}}>
                    <div className='titre11' style={{ color :'#5B548E' , fontSize :'20px'}}> Edit Discharge  Note </div>
                   
                          <div className='num-cmd-1' style={{
                          borderRadius: '20px',
                          height: '30px',
                          width: '120px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', 
                          boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                          color :'#616262',
                          marginLeft :'30px'
                        }}> 
                          {Dichargedate}
                          </div>
                          </div>
                     <Link  onClick={handleCmdList}  style={{
                          borderRadius: '20px',
                          height: '30px',
                          width: '200px' ,
                          padding :'10px' , 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', 
                          boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                          textDecoration :"none",
                          backgroundColor :'#100B39',
                          color :'white'
                        }}>   View Order  </Link>
                 </div>
      


          <div style={{height :' auto'  , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , padding :'30px' }}>
          
          <div style={{ color :'#5B548E' , fontSize :'20px' , marginBottom :'30px', marginLeft :'40%'}}>Designations :</div> 
 
          {cmdDataList.map((cmdData, index) => (    
         <div key={cmdData.id}   style={{display :'flex' , gap :'10px' , alignItems: 'center' ,  width :'100%', marginLeft :'1%'}} >
         <div style={{display :'flex' ,flexDirection :'column'}}>
           <div  style={{fontSize:'15px' , color :'#5B548E' , marginLeft:"50px"}}>   Product:   </div>
           <div  style={{display :'flex', alignItems: 'center' }}>
           <button onClick={() => handleRemoveCmd(cmdData.id)}
         style={{fontSize:'30px', color:"red"  , border :'none' , backgroundColor :'white', marginRight :"10px" }}
         >-</button> 
            
                       <div
                       style={{
                         color: '#666666',
                         borderRadius: '20px',
                         height: '35px',
                         width: '250px',
                         display: 'flex',
                         alignItems: 'center',
                         boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                         border :'none',
                         paddingLeft :'20px'
                       }} >
                       {cmdData.selectedPro}  
                     </div>
                  
                    </div>
                
              </div>



              
            <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'13px' , color :'#5B548E', marginLeft:"15px"}}
                >   N° Inventaire:   </div>
                <div
                 style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                  }}
                >  {cmdData.NumInventaire} </div>
              </div>


             <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'13px' , color :'#5B548E', marginLeft:"10px"}}
                >   Qt.Demandé:   </div>
                <div
                 style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '90px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                  }}
                >   {cmdData.quantiteDemande } </div>
              </div>


              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'13px' , color :'#5B548E', marginLeft:"20px"}}
                >   Qt.Servie:    </div>
                <input type='number'
                 style={{
                    
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '90px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    textAlign:'center'
                  }}
                  value={quantityServie[index]}
                  onChange={(e) => quantityservOnChange(index, e)}
                /> 
              </div>
           



           
              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'13px' , color :'#5B548E', marginLeft:"20px"}}
                >  N° Serie:    </div>
                <input   
               style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    textAlign:'center'
                  }}
                  value={numSerie[index]}
                  onChange={(e) => NumSerieOnChange(index, e)}
                /> 
              </div>

              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'13px' , color :'#5B548E', marginLeft:"20px"}}
                > Observations :    </div>
                <input
                 style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px', 
                    overflowY: 'auto', 
                    width:'160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    textAlign:'center'
                   }}
                  value={Observations[index]}
                  onChange={(e) => ObservationsOnChange(index, e)}
                /> 
              </div>
              
             
              <button 
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
    border :'none',
    marginTop:'20px'
   }}              onClick={() => handleSave(cmdData.id, quantityServie[index], NumInventaire[index], Observations[index], numSerie[index])}>save</button>

              
            </div>
          ))}
          <DechargeComp
           filteredProducts={filteredProducts}
           onAddCmd={(cmdData) => {
           handleAddCmd(cmdData);
          }}
          />
          </div>
    

     <div style={{display:'flex' , gap :'20px' , alignItems :'center' , justifyContent :'center' , marginTop  :'40px', marginBottom :'40px', height:'100px'}}>
    <button
    style={{
        borderRadius: '20px',
        height: '35px',
        width: '120px' ,
        paddingRight :'10px', 
        display: 'flex',
        alignItems: 'center',
        textDecoration :"none",
        backgroundColor :'white',
        justifyContent: 'center', 
        color :'#17BF6B',
        border :'1.5px solid #17BF6B'

      }}
    onClick={handleCancel}>Cancel</button> 


<button
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
        border :'none'

      }}
    onClick={handleConfirmCommand}>Confirm</button> 
    </div>
   
    </div>

    

       
      </div>
    </div>
  );
}

export default EditDecharge;
