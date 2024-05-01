// CreateCmd.js
import React, { useState  } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import CmdData from '../data/CmdData';
import produitData from '../data/ProductsData';
import { Link } from 'react-router-dom';
import CmdComp from '../CreateCmd-interne/CmdinterneComp';

function CreateCmdinterne() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [Products, setProducts] = useState([]);
    const [UserService, setUserService] = useState('comité des oeuvres sociales ');


  const [commandInfo, setCommandInfo] = useState({
    id: '0',
    numCmd: '1',
    Service: UserService,
    date: '04-03-2024',
    products: [
        { id: 0, selectedPro:  'Produit 2A', quantity: 100 },
        { id: 1, selectedPro: 'Produit 2', quantity: 100 },
        { id: 2, selectedPro: 'Produit 3', quantity: 100 }
    ]
});

const [cmdDataList, setCmdDataList] = useState(commandInfo.products);


    const handleChapterChange = (e) => {
        setSelectedChapter(e.target.value);
        setSelectedArticle('');
        setFilteredProducts([]);  
      };

    const handleArticleChange = (e) => {
        setSelectedArticle(e.target.value);
        const chapterData = produitData.find(chapter => chapter.chapitre === selectedChapter);
        const articleData = chapterData ? chapterData.articles.find(article => article.nom === e.target.value) : null;
        console.log("articleData" ,articleData )   ;

        const produits = articleData ? articleData.produits : [];
            setProducts(produits);
            console.log("produits" ,produits )   ;
            console.log("filteredProducts" ,filteredProducts )   ;
            console.log("cmdDataList.selectedPro" ,cmdDataList.selectedPro )   ;    
            const nonCommonProducts =  articleData.produits.filter(product => !cmdDataList.map(prod => prod.selectedPro).includes(product.nom));
            // Mettre à jour filteredProducts et products avec les produits filtrés
            setFilteredProducts(nonCommonProducts);
      };

    const handleSupplierChange = (e) => {
        setSelectedSupplier(e.target.value);
        console.log("selectedSupplier" ,selectedSupplier )   ;

        };
      
      

        const handleRemoveCmd = (id) => {
          // Supprimer la commande avec l'ID spécifié de cmdDataList
          setCmdDataList(cmdDataList.filter(cmdData => cmdData.id !== id)); 
          console.log('cmdDataList:', cmdDataList);
          // Rechercher la commande supprimée dans cmdDataList
          const removedCmd = cmdDataList.find(cmdData => cmdData.id === id).selectedPro;
          const removedProduct  = removedCmd.selectedPro ;
          // Trouver les données de l'article correspondant à selectedChapter et selectedArticle
          const chapterData = produitData.find(chapter => chapter.chapitre === selectedChapter);
          const articleData = chapterData ? chapterData.articles.find(article => article.nom === selectedArticle) : null;
      
          // Si la commande supprimée existe et si l'article correspondant contient des produits
          if (removedCmd && articleData && articleData.produits.length > 0) {
            console.log('Condition 1111');
            console.log('articleData.produits', articleData.produits);
            console.log('ID to find:', id);
            const removedProduct = articleData.produits.find(produit => produit.nom === removedCmd);
            console.log('Removed product:', removedProduct);
            if (removedProduct) {
                console.log('Condition 2222');
                // Ajouter le produit supprimé à filteredProducts
                setFilteredProducts([...filteredProducts, { nom: removedCmd }]);
            }
        }
        
      };
       
      const [showQuantityInput, setShowQuantityInput] = useState(true);
      const [editedQuantity, setEditedQuantity] = useState("");
  
      
      const handleEditQuantity = (id,value) =>{
        if (value>0){
        setEditedQuantity("") ;
        setCmdDataList(cmdDataList.map(cmdData => {
            if (cmdData.id === id) {
                alert('Quantity updated successfully ');
                return { ...cmdData, quantity: value };

            }
            return cmdData;
        }))}
    else{
        alert('Quantity must be strictly positive');
    } };
      
      
 

    const handleAddCmd = (cmdData ) => {
      setCmdDataList([...cmdDataList, cmdData]);
      setFilteredProducts(filteredProducts.filter(product => product.nom !== cmdData.selectedPro));
    };

    const handleConfirmCommand = () => {
        const confirm = window.confirm("Are you sure you want to Confirm the command?");
        if (confirm) {
          if (cmdDataList.length>0)
       { const date = new Date().toLocaleDateString('fr-FR');
        const commandeInfo = {
            id: CmdData.length,
            numCmd: CmdData.length + 1,
            Service: UserService,
            date: date,
            products: cmdDataList.map(cmd => ({
                idp: cmd.id,
                nommP: cmd.selectedPro,
                quantité: cmd.quantity
            }))
        };
        console.log('commandeInfo:', commandeInfo);
      //  window.location.href =  '/List des  demandes de fourniture  de ce user '; 

    } else{
        alert('please fill in all  the fileds Correctly ')
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
             //   window.location.href =  '/List des  demandes de fourniture  de ce user '; 


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
     
           // window.location.href =  '/List des  demandes de fourniture  de ce user '; 
        }
        };
  
    const today = new Date().toLocaleDateString('fr-FR');
return (
    <div> 
      <Nav />
      <div className='dwnusers'>
        <Side    link='commands'/>    
        <div   style={{ marginTop :"8vh" , marginLeft :' 15%' , width :'70%', height :'92vh' , padding :'60px'}}   >
                <div className='crcmd1' style={{display :'flex ' , alignItems: 'center', justifyContent:  'space-between'  , gap : '200px' , marginBottom :'40px' }}>
                   <div style={{ display :'flex ' , gap : '20px'}}>
                    <div className='titre11' style={{ color :'#5B548E' , fontSize :'20px'}}>     Demande de  Fourniture  </div>
                   
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
                          {today}
                          </div>
                          </div>
                     <Link  onClick={handleCmdList}  style={{
                          borderRadius: '20px',
                          height: '30px',
                          width: '250px' ,
                          padding :'10px' , 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', 
                          boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                          textDecoration :"none",
                          backgroundColor :'#100B39',
                          color :'white'

                        }}>  Mes Demandes Fourniture </Link>
                 </div>
          <div style={{height :'  auto '  , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , paddingTop :'25px' , marginBottom :'30px' }}>
          <select value={selectedChapter} onChange={handleChapterChange}
          style={{ boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , width :' 280px' ,fontSize :'15px' , height :'40px' , marginBottom :'30px' , marginLeft :'120px', color :'black'}}>
        <option value="">Choisissez un chapitre</option>
{produitData.map((chapter, index) => (
  <option key={index} value={chapter.chapitre}>{chapter.chapitre}</option>
))}

      </select>

      <select value={selectedArticle} onChange={handleArticleChange}
                style={{ boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , width :' 280px' ,fontSize :'15px' , height :'40px' , marginBottom :'30px' , color :'black'}}>
  <option value="">Choisissez un article</option>
  {selectedChapter &&
    produitData.find(chapter => chapter.chapitre === selectedChapter)?.articles.map((article, index) => (
      <option key={index} value={article.nom}>{article.nom}</option>
    ))
  }
</select>
    

   
     
          </div>


          <div style={{height :' auto'  , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , padding :'30px' }}>
          
          <div style={{ color :'#5B548E' , fontSize :'20px' , marginBottom :'30px', marginLeft :'40%'}}>Designations :</div> 
 


      


{cmdDataList.map(cmdData => (
            <div key={cmdData.id}   style={{display :'flex' , gap :'20px' , alignItems: 'center'}} >
              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div  style={{fontSize:'15px' , color :'#5B548E' , marginLeft:"50px" }}>   Product:   </div>
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
                >   Quantity:   </div>
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
                > 
                 {cmdData.quantity} </div>
             </div>


             <div style={{display :'flex', gap:'20px' }}>
               
         <button    style={{
            marginTop:'19px' ,
                    color: 'orange',
                    borderRadius: '20px',
                    height: '35px',
                    width: '100px',
                     boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    backgroundColor :'white',
                    fontSize:'13px'
                  }}


         onClick={() => {setEditedQuantity("") ;
       setShowQuantityInput(cmdData.id) ;
    }
         } >Edit Quantity</button>
            {showQuantityInput === cmdData.id && (
                <div            style={{display :'flex', gap:'10px' }}>
                
                    <input
                    style={{
                        marginTop:'19px' ,
                                color: '#5B548E',
                                borderRadius: '20px',
                                height: '35px',
                                width: '90px',
                                boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                                border :'none',
                                backgroundColor :'white', 
                                paddingLeft :'10px'
                              }}
                        value={editedQuantity}
                        onChange={(e) => setEditedQuantity(parseInt(e.target.value))}
                        type="number"
                        placeholder="Quantity"
                    />

                    <button style={{
            marginTop:'19px' ,
                    color: 'green',
                    borderRadius: '20px',
                    height: '35px',
                    width: '60px',
                   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    backgroundColor :'white'
                  }}
                     onClick={() => handleEditQuantity(cmdData.id, editedQuantity)}>Save</button>
                    <button
                    style={{
                        marginTop:'19px' ,
                                color: 'red',
                                borderRadius: '20px',
                                height: '35px',
                                width: '60px',
                                boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                                border :'none',
                                backgroundColor :'white'
                              }}
                    onClick={() => setShowQuantityInput(null)}>Cancel</button>
                </div>
            )}
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

export default CreateCmdinterne;
