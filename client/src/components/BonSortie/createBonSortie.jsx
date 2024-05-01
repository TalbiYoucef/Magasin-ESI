// CreateCmd.js
import React, { useState , useEffect } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import CmdData from '../data/CommandInterne';
import ProduitData from '../data/Produit';
import { Link } from 'react-router-dom';
import CmdComp from './SortieComp';
import { MdNavigateNext } from "react-icons/md";
function CreateBonSortie() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [cmdDataList, setCmdDataList] = useState([]);//cmdDataList contient table de produit ajoute
    
    const [Products, setProducts] = useState([]);
    const [priU, setPriU] = useState("");
    const [command, setCommand] = useState({
        id: '0',
        date: '04-03-2024',
        service:'comité des oeuvres sociales',
        products: [
            { idp: 0, nommP: 'Produit 1',quantiteDemande:'100'},
            { idp: 1, nommP: 'Produit 2' ,quantiteDemande:'50'},
            { idp: 2, nommP: 'Produit 3',quantiteDemande:'60' },
            { idp: 3, nommP: 'Produit 4',quantiteDemande:'900'  },
            { idp: 4, nommP: 'Produit 5',quantiteDemande:'90' }
     
          
        ]
    });
    const [filteredProducts, setFilteredProducts] = useState(command.products);
    


       // Définissez une fonction pour valider la quantité servie par rapport à la quantité demandée
    const validateQuantiteServie = () => {
      // Parcourez la liste des produits de la commande
      for (const cmdData of cmdDataList) {
          // Trouvez le produit correspondant dans la liste des produits de la commande initiale
          const initialProduct = command.products.find(product => product.nommP === cmdData.selectedPro);
          if (initialProduct) {
              // Convertissez les quantités en nombres pour effectuer la comparaison
              const quantiteDemandee = parseInt(initialProduct.quantiteDemande);
              const quantiteServie = parseInt(cmdData.quantitéServie);
              // Vérifiez si la quantité servie est supérieure à la quantité demandée
              if (quantiteServie > quantiteDemandee) {
                  // Retournez faux si la quantité servie est supérieure à la quantité demandée
                  return false;
              }
          }
      }
      // Retournez vrai si toutes les validations passent
      return true;
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
      // Obtenez le produit correspondant dans la liste des produits de commande initiale
      const initialProduct = command.products.find(product => product.nommP === cmdData.selectedPro);
      if (initialProduct) {
          // Convertissez les quantités en nombres pour effectuer la comparaison
          const quantiteDemandee = parseInt(initialProduct.quantiteDemande);
          const quantiteServie = parseInt(cmdData.quantitéServie);
          // Vérifiez si la quantité servie est inférieure ou égale à la quantité demandée
          if (quantiteServie <= quantiteDemandee) {
              // Si la condition est remplie, ajoutez la nouvelle commande
              setCmdDataList([...cmdDataList, cmdData]);
              console.log(cmdData);
              // Filtrer les produits pour exclure le produit ajouté de la liste des produits filtrés
              setFilteredProducts(filteredProducts.filter(product => product.nommP !== cmdData.selectedPro));
              console.log('filteredProducts add', filteredProducts);
          } else {
              // Si la quantité servie est supérieure à la quantité demandée, affichez un message d'erreur
              alert("La quantité servie ne peut pas être supérieure à la quantité demandée.");
          }
      }
  };
  
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
                quantitéDemande: cmd.quantityDemande,
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

    const handleCancel = () => {
        const confirm = window.confirm("Are you sure you want to cancel the command?");
        if (confirm) {
        setSelectedChapter(null);
        setSelectedArticle(null);
        setSelectedSupplier(null);
        setCmdDataList([]);
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
          {cmdDataList.map(cmdData => (
            <div key={cmdData.id}   style={{display :'flex' , gap :'15px' , alignItems: 'center'}} >
              <div style={{display :'flex',width:'26%',marginLeft:'1.75%' ,flexDirection :'column'}}>
                <div  style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'40px',marginBottom:'5px', marginTop :'20px'}}>   Product:   </div>
              <div  style={{display :'flex',width:'100%', alignItems: 'center' , margin :"0px" }}>
                <button onClick={() => handleRemoveCmd(cmdData.id)}
              style={{fontSize:'30px', color:"red"  , border :'none' , backgroundColor :'white'}}
              >-</button> 
                <div
                  style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '45px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    paddingLeft :'20px'
                  }}

                >
                       {cmdData.selectedPro}  </div>
                       </div>
                
              </div>

              <div style={{width:'9%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px',marginBottom:'5px'}}
                >   Quant Demande:   </div>
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
                  }}
                >  {command.products.find(product => product.nommP === cmdData.selectedPro)?.quantiteDemande } </div>
              </div>
              <div style={{width:'9%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px',marginBottom:'5px'}}
                >   Quant Servie:   </div>
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
                  }}
                >  {cmdData.quantitéServie} </div>
              </div>

              <div style={{width:'22%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px',marginBottom:'5px'}}
                >   N° Inventaire:   </div>
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
                  }}
                >  {cmdData.NumInventaire}  </div>
              </div>
              <div style={{width:'22%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px',marginBottom:'5px'}}
                >   Observations:   </div>
                <div
                 style={{
                    
                    color: '#666666',
                    borderRadius: '20px',
                    height: '45px', // Hauteur fixe, ajustez selon vos besoins
                    overflowY: 'auto', // Utilisation de 'auto' pour activer le défilement vertical si nécessaire
  
                    
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                  }}
                > {cmdData.Observations}  </div>
              </div>
              

              
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

export default CreateBonSortie;