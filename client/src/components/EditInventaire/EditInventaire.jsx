// CreateCmd.js
import React, { useState , useEffect } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

function EditInventaire() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    
   

      
    const [Products, setProducts] = useState([]);
    const [priU, setPriU] = useState("");
    const [inventaire, setinventaire] = useState({
        id: '0',
        products: [
            { id: 0, selectedPro: 'Produit 1',Quantité:'100',quantitéPhysique:'5',Observations:''},
            { id: 1, selectedPro: 'Produit 2' ,Quantité:'50',quantitéPhysique:'',Observations:''},
            { id: 2,selectedPro: 'Produit 3',Quantité:'60' ,quantitéPhysique:'',Observations:''},
            { id: 3,selectedPro : 'Produit 4',Quantité:'900' ,quantitéPhysique:'6',Observations:'' },
            { id: 4, selectedPro: 'Produit 5',Quantité:'90' ,quantitéPhysique:'',Observations:''},
            { id: 5, selectedPro: 'Produit 6',Quantité:'100',quantitéPhysique:'',Observations:''},
            { id: 6, selectedPro: 'Produit 7' ,Quantité:'50',quantitéPhysique:'',Observations:''},
            { id: 7,selectedPro: 'Produit 8',Quantité:'60' ,quantitéPhysique:'',Observations:''},
            { id: 8,selectedPro : 'Produit 9',Quantité:'900' ,quantitéPhysique:'',Observations:'' },
            { id: 9, selectedPro: 'Produit 10',Quantité:'90' ,quantitéPhysique:'',Observations:''}
     
          
        ]
    });

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
  };
 


//--------------------------------
    const [Observations, setObservations] = useState(inventaire.products.map(product => product.Observations));
    const [quantity, setQuantity] = useState(inventaire.products.map(product => product.quantitéPhysique));// Quantite Servie
    


  const [filteredProducts, setFilteredProducts] = useState([]);
    
    const [cmdDataList, setCmdDataList] = useState(inventaire.products);//cmdDataList contient table de produit ajoute
  




    const quantityservOnChange = (index, e) => {
        const updatedQuantityDemande = [...quantity];
        updatedQuantityDemande[index] = e.target.value;
        setQuantity(updatedQuantityDemande);
      };
      const ObservationsOnChange = (index, e) => {
        const updatedObservations = [...Observations];
        updatedObservations[index] = e.target.value;
        setObservations(updatedObservations);
      };
      
     
  
      
  
        


   





    
    

    const handleSave = (id, value, value3) => {
      // Vérifier si les valeurs sont présentes et correctes
      const numericValue = parseFloat(value);
      if (value !== undefined && value !== null && value !== "") {
        // Vérifier si la quantité est strictement positive
        if (numericValue > 0 && !isNaN(numericValue)) {
          // Afficher une boîte de dialogue de confirmation
          const confirmSave = window.confirm(
            "Êtes-vous sûr de vouloir enregistrer les modifications?"
          );
    
          // Vérifier si l'utilisateur a confirmé l'enregistrement
          if (confirmSave) {
            // Mettre à jour la liste des données de commande
            setCmdDataList(
              cmdDataList.map((cmdData) => {
                const numericQuantité = parseFloat(cmdData.Quantité);
                if (cmdData.id === id) {
                  if (numericValue <=  numericQuantité ) {
                    
                   // Mettre à jour la quantité servie et les observations
                    if (numericQuantité !== numericValue) {
                      // L'observation est obligatoire si les quantités diffèrent
                      if (!value3 ) {
                        alert("L'observation est obligatoire si la quantité physique diffère de la quantité ");
                        return cmdData;
                      }else {
                        alert("Quantité mise à jour avec succès");
                    return { ...cmdData, quantiteServie: value, Observations: value3 }
                      }
                    }else {
                    
                     
                      alert("Quantité mise à jour avec succès");
                    return { ...cmdData, quantiteServie: value, Observations: value3 };}
                    
    
                  } else {
                    alert("La quantité physique doit être inférieure ou égale à la quantité ");
                  }
                   
                }
                return cmdData;
              })
            );
          }
        } else {
          alert("La quantité doit être strictement positive");
        }
      } else {
        alert("Veuillez remplir la quantité");
      }
    };
    
      


   

    const handleCmdList= () => {
        const confirm = window.confirm("Are you sure you want to Leave this form ?");
        if (confirm) {
            setSelectedChapter(null);
        setSelectedArticle(null);
        setSelectedSupplier(null);
        setCmdDataList([]);
        setFilteredProducts([]);
        setProducts([]);
        setPriU("");
            window.location.href = '/'; // declare view inventaire t3 narimane
        }
        };
  
    const user = JSON.parse(localStorage.getItem('user'));
    const today = new Date().toLocaleDateString('fr-FR');
return (
    <div> 
      <Nav   />
      <div className='dwnusers'   >
        <Side   link='commands'/>    
        <div   style={{overflow:'100% auto',width:'100%',marginTop :"8vh" , marginLeft :' 60px' , height :'92vh',paddingBottom:'100px' , padding :'60px'}}   >
                <div  style={{display :'flex ' ,width:'95%', alignItems: 'center', justifyContent:  'space-between'  , gap : '100px' , marginBottom :'40px' }}>
                   <div style={{ display :'flex ' , gap : '20px'}}>
                    <div  style={{ color :'#5B548E',marginLeft:'10px',marginRight:'60px' , fontSize :'26px'}}>   Edit Inventory </div>
                    
                          
                          </div>
                     <Link  onClick={handleCmdList}  style={{
                          borderRadius: '20px',
                          height: '45px',
                          width: '200px' ,
                          marginRight:'70px',
                          padding :'10px' , 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', 
                          boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                          textDecoration :"none",
                          backgroundColor :'#100B39',
                          color :'white'

                        }}>     View inventory   <MdNavigateNext style={{marginLeft:'5px'}} /> </Link>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', width: '450px', height: '40px', borderRadius: '20px', boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)', padding: '20px', color: '#616262', marginTop: '30px', marginLeft: '40px' }}>
                                <BsSearch style={{fontSize:'18px',marginRight:'15px'}} />
                                <input
                                    type="search"
                                    placeholder='search product'
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className='search-input'
                                    style={{ border: 'none', height: '30px', width: '150px' }}
                                />
                            </div>
          


          <div style={{ display: 'flex',paddingLeft:'80px',marginBottom :'100px', flexDirection: 'column', marginTop: '3%', gap: '5%', width: '95%', overflowY: '100% auto', borderRadius: '30px', boxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', WebkitBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', MozBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', border: 'none', position: 'relative'}}>
          
 
         {/* ------------------------ */}
         <div style={{width:'100%',marginBottom:'10px',display :'flex' , gap :'15px' , alignItems: 'center'}}>
         <div style={{display :'flex',width:'26%',marginLeft:'1.75%' ,flexDirection :'column'}}>
                <div  style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'40px', marginTop :'20px'}}>   Product:   </div>
              <div  style={{display :'flex',width:'100%', alignItems: 'center' , margin :"0px" }}>  </div>
                
              </div>

              <div style={{width:'9%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Quantité:   </div>
               
              </div>
              <div style={{width:'9%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Qt.Physique:   </div>
                
              </div>
              <div style={{width:'22%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Observations:   </div>
               
              </div>
         
              </div>

         {/* ------------------------ */}

          {/* La liste des composants de produit */}
          
          {inventaire.products 
.filter(product => product.selectedPro.toLowerCase().includes(searchTerm.toLowerCase()))
.filter(cmd => cmd.quantitéPhysique === '') // Filter inventaire with quantitéPhysique
  .concat(inventaire.products  .filter(product => product.selectedPro.toLowerCase().includes(searchTerm.toLowerCase()))

    .filter(cmd => cmd.quantitéPhysique !== '')) // Concatenate with produit without quantitéPhysique
  .map((cmdData, index) => (
        <div key={cmdData.id}   style={{width:'100%',height:'55px',marginBottom:'10px',display :'flex' , gap :'15px' , alignItems: 'center'}} >
              <div style={{display :'flex',width:'26%',marginLeft:'1.75%' ,flexDirection :'column'}}>
                
              <div  style={{display :'flex',width:'100%', alignItems: 'center' , margin :"0px" }}>
               
                <input
                  style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '45px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    paddingLeft :'20px',
                    textAlign:'center'
                  }}
                  value={cmdData.selectedPro}
                  

                />
                       
                       </div>
                
              </div>

              <div style={{width:'9%',display :'flex' ,flexDirection :'column'}}>
                
                <div
                 style={{
                    
                    color: '#666666',
                    borderRadius: '20px',
                    height: '45px',
                    
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    textAlign:'center'
                  }}
                  
                  
                >  {cmdData.Quantité } </div>
              </div>
              <div style={{width:'9%',display :'flex' ,flexDirection :'column'}}>
                
                <input type='number'
                 style={{
                    
                    color: '#666666',
                    borderRadius: '20px',
                    height: '45px',
                    
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    textAlign:'center'
                  }}
                  placeholder='Qt.Physique'
                  value={quantity[cmdData.id] || ''}  
               onChange={(e) => quantityservOnChange(cmdData.id, e)}
                />  
              </div>

             
              <div style={{width:'30%',display :'flex' ,flexDirection :'column'}}>
               
                <input
                 style={{
                    
                    color: '#666666',
                    borderRadius: '20px',
                    height: '45px', // Hauteur fixe, ajustez selon vos besoins
                    overflowY: 'auto', // Utilisation de 'auto' pour activer le défilement vertical si nécessaire
  
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    textAlign:'center'
                  }}
                  placeholder='Observation '
                  value={Observations[index]}
                  onChange={(e) => ObservationsOnChange(index, e)}
                /> 
              </div>
              
             
              <button 
              style={{borderRadius: '20px', height: '45px',   width: '100px' ,   paddingRight :'10px',    display: 'flex',   alignItems: 'center',textDecoration :"none",backgroundColor :'#17BF6B',justifyContent: 'center', color :'white',border :'none',marginTop:'0px',textAlign:'center'}}
              onClick={() => handleSave(cmdData.id, quantity[cmdData.id], Observations[index])}>save</button>

              
            </div>
          ))}
         
          </div>
    

     
   
    </div>

    

       
      </div>
    </div>
  );
}

export default EditInventaire;