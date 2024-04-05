// CreateCmd.js
import React, { useState , useEffect } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import CmdData from '../data/CmdData';
import ProduitData from '../data/ProduitData';
import { Link } from 'react-router-dom';
import CmdComp from './cmdComp';
function CreateCmd() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [cmdDataList, setCmdDataList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [Products, setProducts] = useState([]);
    const [priU, setPriU] = useState("");

    const getPrixUnitaire = (selectedPro) => {
        const product = Products.find((prod) => prod.nom === selectedPro);
        return product ? product.prixUnitaire : '';
      };
      


    const handleChapterChange = (e) => {
        setSelectedChapter(e.target.value);
        setSelectedArticle('');
        setSelectedSupplier('');
        setCmdDataList([]);
        setFilteredProducts([]);    };

    const handleArticleChange = (e) => {
        setSelectedArticle(e.target.value);
        setSelectedSupplier('');
        setCmdDataList([]);
        setFilteredProducts([]);    };

    const handleSupplierChange = (e) => {
        setSelectedSupplier(e.target.value);
        setCmdDataList([]);
        setFilteredProducts([]);
            const chapterData = ProduitData.find(chapter => chapter.chapitre === selectedChapter);
            const articleData = chapterData ? chapterData.articles.find(article => article.nom === selectedArticle) : null;
            const supplierData = articleData ? articleData.fournisseurs.find(supplier => supplier.nom === e.target.value) : null;
            const products = supplierData ? supplierData.produitsFournis : [];
            setFilteredProducts(products);
            setProducts(products);
        };
      
      
  
        const handleRemoveCmd = (id) => {
            // Filtrer la liste des commandes pour supprimer celle avec l'ID spécifié
            setCmdDataList(cmdDataList.filter(cmdData => cmdData.id !== id)); 
            // Ajouter le produit supprimé à nouveau à la liste des produits filtrés
            const removedCmd = cmdDataList.find(cmdData => cmdData.id === id);
            if (removedCmd) {
              setFilteredProducts([...filteredProducts, { nom: removedCmd.selectedPro }]);
            }
          };

    console.log("cmdDataList" ,cmdDataList )   ;
    const handleAddCmd = (cmdData ) => {
      setCmdDataList([...cmdDataList, cmdData]);
      setFilteredProducts(filteredProducts.filter(product => product.nom !== cmdData.selectedPro));
      setPriU(getPrixUnitaire(cmdData.selectedPro)); // Mettre à jour le prix unitaire lors de l'ajout d'une commande
    };

    const handleConfirmCommand = () => {
        const confirm = window.confirm("Are you sure you want to Confirm the command?");
        if (confirm) {
        const date = new Date().toLocaleDateString('fr-FR');
        const commandeInfo = {
            id: CmdData.length,
            numCmd: CmdData.length + 1,
            chapitre: selectedChapter,
            Article: selectedArticle,
            supplier: selectedSupplier,
            date: date,
            state: 'initialized',
            products: cmdDataList.map(cmd => ({
                idp: cmd.id,
                nommP: cmd.selectedPro,
                quantité: cmd.quantity
            }))
        };
        console.log('commandeInfo:', commandeInfo);
        window.location.href = '/commandManagement'; 

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
            window.location.href = '/commandManagement'; 
        }
        };
  
    const user = JSON.parse(localStorage.getItem('user'));
    const today = new Date().toLocaleDateString('fr-FR');
return (
    <div>
      <Nav  username={user.username} />
      <div className='dwnusers'>
        <Side    link='commands'/>    
        <div   style={{ marginTop :"8vh" , marginLeft :' 60px' , width :'100%', height :'92vh' , padding :'60px'}}   >
                <div className='crcmd1' style={{display :'flex ' , alignItems: 'center', justifyContent:  'space-between'  , gap : '300px' , marginBottom :'40px' }}>
                   <div style={{ display :'flex ' , gap : '20px'}}>
                    <div className='titre11' style={{ color :'#5B548E' , fontSize :'20px'}}>    Create Command N° </div>
                    <div className='num-cmd-1' style={{
                          borderRadius: '20px',
                          height: '30px',
                          width: '80px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', 
                          boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                          color :'#616262'
                        }}> 
                          {CmdData.length + 1}
                          </div>
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

                        }}>  Commands List  </Link>
                 </div>
          <div style={{height :'80px'  , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , padding :'20px' , marginBottom :'30px' }}>
          <select value={selectedChapter} onChange={handleChapterChange}
          style={{ boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , width :' 260px' ,fontSize :'15px' , height :'40px' , marginBottom :'30px' }}>
        <option value="">Choisissez un chapitre</option>
        {ProduitData.map((chapter, index) => (
          <option key={index} value={chapter.chapitre}>{chapter.chapitre}</option>
        ))}
      </select>

      <select value={selectedArticle} onChange={handleArticleChange}
                style={{ boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , width :' 260px' ,fontSize :'15px' , height :'40px' , marginBottom :'30px' }}>
  <option value="">Choisissez un article</option>
  {selectedChapter &&
    ProduitData.find(chapter => chapter.chapitre === selectedChapter)?.articles.map((article, index) => (
      <option key={index} value={article.nom}>{article.nom}</option>
    ))
  }
</select>
    

   
        <select value={selectedSupplier} onChange={handleSupplierChange}
                  style={{ boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , width :' 260px' ,fontSize :'15px' , height :'40px' , marginBottom :'30px' }}>
          <option value="">Choisissez un fournisseur</option>
          {selectedArticle &&  ProduitData.find(chapter => chapter.chapitre === selectedChapter).articles
            .find(article => article.nom === selectedArticle).fournisseurs.map((supplier, index) => (
              <option key={index} value={supplier.nom}>{supplier.nom}</option>
            ))}
        </select>
          </div>


          <div style={{height :' auto'  , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , padding :'30px' }}>
          
          <div style={{ color :'#5B548E' , fontSize :'20px' , marginBottom :'20px'}}>Designations :</div> 
 


          {/* La liste des composants de commande */}
          {cmdDataList.map(cmdData => (
            <div key={cmdData.id}   style={{display :'flex' , gap :'20px' , alignItems: 'center'}} >
              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div  style={{fontSize:'15px' , color :'#5B548E' , marginLeft:"50px" }}>   Produit:   </div>
              <div  style={{display :'flex', alignItems: 'center' , margin :"0px" }}>
                <button onClick={() => handleRemoveCmd(cmdData.id)}
              style={{fontSize:'30px', color:"red"  , border :'none' , backgroundColor :'white'}}
              >-</button> 
                <div
                  style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '300px',
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

              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'13px' , color :'#5B548E', marginLeft:"18px"}}
                >   Quantité:   </div>
                <div
                 style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                  }}
                >  {cmdData.quantity} </div>
              </div>

              
              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'13px' , color :'#5B548E', marginLeft:"18px"}}
                >   Prix Unitaire:   </div>
                <div
                 style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                  }}
                > 
                 
                 {   
 Products && (
    <>{getPrixUnitaire(cmdData.selectedPro)}</>
  )}
                  </div>
                  
              </div>

              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'13px' , color :'#5B548E', marginLeft:"18px"}}
                >   Montant:   </div>
                <div
                 style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                  }}
                >
                       {cmdData.quantity * getPrixUnitaire(cmdData.selectedPro)}
              </div>
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

export default CreateCmd;
