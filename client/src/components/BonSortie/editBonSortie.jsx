// CreateCmd.js
import React, { useState , useEffect } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import CmdData from '../data/CommandInterne';
import { Link } from 'react-router-dom';
import CmdComp from './SortieComp';
import { MdNavigateNext } from "react-icons/md";
function EditBonSortie() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    
   

      
    const [Products, setProducts] = useState([]);
    const [priU, setPriU] = useState("");
    const [command, setCommand] = useState({//command n9sd biha f had l cas sortie
        id: '0',
        date: '04-03-2024',
        service:'comité des oeuvres sociales',
        products: [
            { id: 0, selectedPro: 'Produit 1',quantiteDemande:'100',quantitéServie:'2',NumInventaire:'66',Observations:'5499'},
            { id: 1, selectedPro: 'Produit 2' ,quantiteDemande:'50',quantitéServie:'5',NumInventaire:'77',Observations:'588'},
            { id: 2,selectedPro: 'Produit 3',quantiteDemande:'60' ,quantitéServie:'9',NumInventaire:'33',Observations:'566'},
            { id: 3,selectedPro : 'Produit 4',quantiteDemande:'900' ,quantitéServie:'6',NumInventaire:'86',Observations:'994' },
            { id: 4, selectedPro: 'Produit 5',quantiteDemande:'90' ,quantitéServie:'7',NumInventaire:'99',Observations:'4'}
     
          
        ]
    });
    const [NumInventaire, setNumInventaire] = useState(command.products.map(product => product.NumInventaire));
    const [Observations, setObservations] = useState(command.products.map(product => product.Observations));
    const [quantity, setQuantity] = useState(command.products.map(product => product.quantitéServie));// Quantite Servie
    


  const [filteredProducts, setFilteredProducts] = useState([]);
    
    const [cmdDataList, setCmdDataList] = useState(command.products);//cmdDataList contient table de produit ajoute
  
    console.log('command.products',command.products);

    console.log('cmdDataList',cmdDataList);



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
      
      const NumInventaireOnChange = (index, e) => {
        const updatedNumInventaire = [...NumInventaire];
        updatedNumInventaire[index] = e.target.value;
        setNumInventaire(updatedNumInventaire);
      };
      
  
      
  
        const handleRemoveCmd = (id) => {
            setCmdDataList(cmdDataList.filter(cmdData => cmdData.id !== id)); 
            const removedCmd = cmdDataList.find(cmdData => cmdData.id === id);
            if (removedCmd) {
              setFilteredProducts([...filteredProducts, { nommP: removedCmd.selectedPro }]);
            }
            console.log('removedCmd',removedCmd);
            console.log('filteredProducts remove',filteredProducts);
          };

    console.log("cmdDataList" ,cmdDataList )   ;










    
    const handleAddCmd = (cmdData) => {
        // Vérifiez si le produit existe dans la liste de commandes
        const productDetails = command.products.find(product => product.selectedPro === cmdData.selectedPro);
        
        if (productDetails) {
            // Si le produit est trouvé, extrayez la quantité demandée
            const { quantiteDemande } = productDetails;
    
            // Ajoutez le nouveau produit avec la quantité demandée à la liste de commandes
            setCmdDataList([...cmdDataList, { ...cmdData, quantiteDemande }]);
            setFilteredProducts(filteredProducts.filter(product => product.nommP !== cmdData.selectedPro));
    
            // Mettez à jour les valeurs de quantité servie, numéro d'inventaire et observations seulement pour le nouveau produit
            setQuantity([...quantity, '']);
            setNumInventaire([...NumInventaire, '']);
            setObservations([...Observations, '']);
        } else {
            // Si le produit n'est pas trouvé, affichez un message d'erreur
            console.log('Product not found in command list');
        }
    };
    
    // Utilisez un effet pour mettre à jour les états initiaux avec les nouvelles valeurs seulement lorsque cmdDataList change
    useEffect(() => {
        // Obtenez les valeurs initiales des produits existants dans la liste
        const initialQuantity = cmdDataList.map(cmdData => cmdData.quantitéServie);
        const initialNumInventaire = cmdDataList.map(cmdData => cmdData.NumInventaire);
        const initialObservations = cmdDataList.map(cmdData => cmdData.Observations);
        
        // Mettez à jour les états initiaux
        setQuantity(initialQuantity);
        setNumInventaire(initialNumInventaire);
        setObservations(initialObservations);
    }, [cmdDataList]);
    











        console.log('filteredProducts',filteredProducts);
    const handleConfirmCommand = () => {
        const confirm = window.confirm("Are you sure you want to Confirm the Receipt?");
        if ( confirm  ) {
          if (cmdDataList.length>0 ){
        const date = new Date().toLocaleDateString('fr-FR');
        const BonSortieInfo = {
            id: CmdData.length,
            date: date,
            service:command.service,
            products: cmdDataList.map(cmd => ({
                idp: cmd.id,
                nommP: cmd.selectedPro,
                quantiteDemande: cmd.quantiteDemande,
                quantitéServie:cmd.quantitéServie,
                NumInventaire:cmd.NumInventaire,
                Observations:cmd.Observations



            }))
        };
        console.log('BonSortieInfo:', BonSortieInfo);
     //   window.location.href = '/Command';
          }else{
            alert('fill in at least one product ')
          }

    }

    };
    
    
    const handleSave = (id, value, value2, value3) => {
      // Vérifier si les valeurs sont présentes et correctes
      if (value && value2 && value3) {
          // Vérifier si la quantité est strictement positive
          if (value > 0) {
              // Afficher une boîte de dialogue de confirmation
              const confirmSave = window.confirm("Are you sure you want to save the changes?");
              
              // Vérifier si l'utilisateur a confirmé l'enregistrement
              if (confirmSave) {
                  // Mettre à jour la liste des données de commande
                  setCmdDataList(cmdDataList.map(cmdData => {
                      if (cmdData.id === id) {
                          alert('Quantity updated successfully');
                          return { ...cmdData, quantitéServie: value, NumInventaire: value2, Observations: value3 };
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
  };
  

    console.log('cmdDataaaaaaaaaaaaaaaaa',cmdDataList);

    const handleCancel = () => {
        const confirm = window.confirm("Are you sure you want to cancel the command?");
        if (confirm) {
        setSelectedChapter(null);
        setSelectedArticle(null);
        setSelectedSupplier(null);
        setCmdDataList(command.products);
        setFilteredProducts([]);
        setProducts([]);
        setPriU("");
    };}

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
            window.location.href = '/Command'; 
        }
        };
  
    const user = JSON.parse(localStorage.getItem('user'));
    const today = new Date().toLocaleDateString('fr-FR');
return (
    <div> 
      <Nav  username={user.username}  />
      <div className='dwnusers' >
        <Side   link='commands'/>    
        <div   style={{ marginTop :"8vh" , marginLeft :' 60px' , width :'100%', height :'92vh' , padding :'60px'}}   >
                <div className='crcmd1' style={{display :'flex ' , alignItems: 'center', justifyContent:  'space-between'  , gap : '100px' , marginBottom :'40px' }}>
                   <div style={{ display :'flex ' , gap : '20px'}}>
                    <div className='titre11' style={{ color :'#5B548E',marginLeft:'10px',marginRight:'60px' , fontSize :'20px'}}>    Bon De Sortie </div>
                    
                          <div className='num-cmd-1' style={{
                          borderRadius: '20px',
                          height: '30px',
                          width: '120px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', 
                          boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                          color :'#616262'
                        }}> 
                          {today}
                          </div>
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

                        }}>  View Fourniteur <MdNavigateNext /> </Link>
                 </div>
          <div style={{display: 'flex',marginTop: '3%',marginBottom:'3%',gap: '8%',width: '95%',height: '140px',backgroundColor: 'white',borderRadius: '30px',boxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',WebkitBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',MozBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',border: 'none'}}>
          
      <div className="su130" style={{marginLeft:'7%',width: '45%'}}>
              <p htmlFor="" style={{color: '#5B548E',marginLeft:'60px',marginTop:'10px'}}>Servie</p>
              <input type="text" name="" id="" className='suppname30' style={{width: '100%',height: '50px',marginLeft: '5%', backgroundColor: 'white',borderRadius: '30px',boxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',WebkitBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',MozBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',border: 'none'
}} value={command.service }/>{/* Remplir le champ avec le nom du fournisseur de la commande sélectionnée */}
        </div>
      
             
              <div className="su330">
              <p htmlFor="" style={{color: '#5B548E',marginLeft:'60px',marginTop:'10px'}}>Date</p>
              <input type="text" className='date30' style={{ width: '100%', height: '50px', marginLeft: '5%',  backgroundColor: 'white', borderRadius: '30px', boxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',  WebkitBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',  MozBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)',  border: 'none'}} value={command.date }/>{/* Remplir le champ avec la date de la commande sélectionnée */}
              </div>
    

   
        
          </div>


          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '3%', gap: '5%', width: '95%', overflowY: '100% auto', backgroundColor: 'white', borderRadius: '30px', boxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', WebkitBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', MozBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', border: 'none', position: 'relative'}}>
          
          <div style={{ marginBottom:'0px',color :'#5B548E' , fontSize :'20px' ,marginLeft:'60px', marginTop :'20px'}}>Designations :</div> 
 


          {/* La liste des composants de commande */}
          
          {cmdDataList.map((cmdData, index) => (    
        <div key={cmdData.id}   style={{width:'1400px',display :'flex' , gap :'15px' , alignItems: 'center'}} >
              <div style={{display :'flex',width:'26%',marginLeft:'1.75%' ,flexDirection :'column'}}>
                <div  style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'40px',marginBottom:'5px', marginTop :'20px'}}>   Product:   </div>
              <div  style={{display :'flex',width:'100%', alignItems: 'center' , margin :"0px" }}>
                <button onClick={() => handleRemoveCmd(cmdData.id)}
              style={{fontSize:'30commandpx', color:"red"  , border :'none' , backgroundColor :'white'}}
              >-</button> 
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
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px',marginBottom:'5px'}}
                >   Qt Demande:   </div>
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
                  
                  
                >  {cmdData.quantiteDemande } </div>
              </div>
              <div style={{width:'9%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px',marginBottom:'5px'}}
                >   Quant Servie:   </div>
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
                  value={quantity[index]}
                  onChange={(e) => quantityservOnChange(index, e)}
                />  
              </div>

              <div style={{width:'15%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px',marginBottom:'5px'}}
                >   N° Inventaire:   </div>
                <input
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
                  value={NumInventaire[index]}
                  onChange={(e) => NumInventaireOnChange(index, e)}
                />  
              </div>
              <div style={{width:'22%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px',marginBottom:'5px'}}
                >   Observations:   </div>
                <input
                 style={{
                    
                    color: '#666666',
                    borderRadius: '20px',
                    height: '45px', // Hauteur fixe, ajustez selon vos besoins
                    overflowY: 'auto', // Utilisation de 'auto' pour activer le défilement vertical si nécessaire
  
                    width:'80%',
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
              style={{borderRadius: '20px', height: '45px',   width: '150px' ,   paddingRight :'10px',    display: 'flex',   alignItems: 'center',textDecoration :"none",backgroundColor :'#17BF6B',justifyContent: 'center', color :'white',border :'none',marginTop:'55px',textAlign:'center'}}
              onClick={() => handleSave(cmdData.id, quantity[index], NumInventaire[index], Observations[index])}>save</button>

              
            </div>
          ))}
          <CmdComp
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

export default EditBonSortie;