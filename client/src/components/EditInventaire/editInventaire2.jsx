// CreateCmd.js
import React, { useState , useEffect } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import produitData from '../data/ProduitsData';

function EditInventaire2() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [Products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [quantity, setQuantity] = useState([]);// Quantite Servie
    const [Observations, setObservations] = useState([]);


    const quantityservOnChange = (productId, e) => {
      const updatedQuantity = { ...quantity }; // Créez une copie de quantity
      updatedQuantity[productId] = e.target.value; // Mettez à jour la quantité pour le produit spécifié
      setQuantity(updatedQuantity); // Mettez à jour l'état quantity
    };

  const handleChapterChange = (e) => {
    const newChapter = e.target.value;
    setSelectedChapter(newChapter);
    setCmdDataList([]);
    setFilteredProducts([]);
    console.log("Selected chapter:", newChapter);
};
useEffect(() => {
  if (filteredProducts.length > 0) {
    const initialQuantities = filteredProducts.reduce((acc, product) => {
      acc[product.id] = product.quantitéPhysique || ''; // Assurez-vous que la clé est correcte
      return acc;
  }, {});
  setQuantity(initialQuantities);

      const initialObservations = filteredProducts.reduce((acc, product) => {
          acc[product.id] = product.Observations || ''; // Assurez-vous que la clé est correcte
          return acc;
      }, {});
      setObservations(initialObservations);
  }
}, [filteredProducts]); 

const handleArticleChange = (e) => {
    const newArticle = e.target.value;
    console.log("Selected article:", newArticle);  
    setSelectedArticle(newArticle);

    setSelectedChapter(prevChapter => {
        const chapterData = produitData.find(chapter => chapter.chapitre === prevChapter);
        console.log("Chapter data:", chapterData);
        
        if (chapterData) {
            const articleData = chapterData.articles.find(article => article.nom === newArticle);
            if (articleData) {
                const filteredProducts = articleData.produits.map(produit => produit);
                setFilteredProducts(filteredProducts);
                console.log("filteredProducts.map(product => product.quantitéPhysique) ", quantity);

                console.log("Filtered products:", filteredProducts);
            } else {
                console.log("Article not found in selected chapter");
            }
        } else {
            console.log("No chapter selected");
        }
        return prevChapter; // Return the previous state as no update is needed
    });
};
      
   

      
    const [priU, setPriU] = useState("");
   
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
  };
 


//--------------------------------
  //  const [Observations, setObservations] = useState(inventaire.products.map(product => product.Observations));
    


    
    const [cmdDataList, setCmdDataList] = useState([]);//cmdDataList contient table de produit ajoute
    useEffect(() => {
      setCmdDataList(filteredProducts);
    }, [filteredProducts]);
    console.log("cmdDataList :", cmdDataList);





    
    const ObservationsOnChange = (id, e) => {
      setObservations(prevObservations => ({
        ...prevObservations,
        [id]: e.target.value
      }));
    };
      
     
  
      
  
        


   





    
    

    const handleSave = (id, value, value3) => {
      // Vérifier si les valeurs sont présentes et correctes
      const numericValue = parseFloat(value);


      if (value !== undefined && value !== null && value !== "") {
        // Vérifier si la quantité est strictement positive
        if (numericValue >= 0 && !isNaN(numericValue)) {
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
                      console.log("numericQuantité !== numericValue :", numericQuantité !== numericValue);

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
          alert("La quantité doit être positive");
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
      <Nav  username={user.username}  />
      <div className='dwnusers'   >
        <Side   link='commands'/>    
        <div   style={{ overflow:'100% auto',width:'100%',marginTop :"8vh" , marginLeft :' 60px' , height :'92vh' , padding :'60px'}}   >
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
                 
                            <div style={{height :' 100px ' ,display :'flex' , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , padding :'20px' , marginBottom :'30px' , gap :'calcl(height/3-40px)'}}>
          <div>
          <div  style={{fontSize:'15px' , color :'#5B548E' , marginLeft:"50px" }}>   Chapitre:   </div>
          <select value={selectedChapter} onChange={handleChapterChange}
          style={{ boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , width :' 260px' ,fontSize :'15px' , height :'40px' , marginBottom :'30px' ,border:'none' ,color:'rgba(58,53,65,0.87)'}}>
        <option value="">Choisissez un chapitre</option>
{produitData.map((chapter, index) => (
  <option key={index} value={chapter.chapitre}>{chapter.chapitre}</option>
))}

     
  
      </select>  
      </div>
      <div>
      <div  style={{fontSize:'15px', color :'#5B548E' , marginLeft:"50px" }}>   Article:   </div>

      <select value={selectedArticle} onChange={handleArticleChange}
                style={{color:'rgba(58,53,65,0.87)', boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , width :' 260px' ,fontSize :'15px' , height :'40px' , marginBottom :'30px' ,border:'none' }}>
  <option value="">Choisissez un article</option>
  {selectedChapter &&
    produitData.find(chapter => chapter.chapitre === selectedChapter)?.articles.map((article, index) => (
      <option key={index} value={article.nom}>{article.nom}</option>
    ))
  }
</select>
</div>

<div style={{ display: 'flex', alignItems: 'center', width: '450px', height: '40px', borderRadius: '20px', boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)', padding: '20px', color: '#616262', marginTop: '20px', marginLeft: '40px' }}>
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
          </div>


          <div style={{ display: 'flex',padding:'20px', flexDirection: 'column', marginTop: '3%', gap: '5%', width: '95%', overflowY: '100% auto', backgroundColor: 'white', borderRadius: '30px', boxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', WebkitBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', MozBoxShadow: '0px 1px 18px -12px rgba(0,0,0,0.52)', border: 'none', position: 'relative'}}>
          
 
         {/* ------------------------ */}
         <div style={{ width:'100%',marginBottom:'10px',display :'flex' , gap :'15px' , alignItems: 'center'}}>
         <div style={{display :'flex',width:'26%',marginLeft:'1.75%' ,flexDirection :'column'}}>
                <div  style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'40px', marginTop :'20px'}}>   Product:   </div>
              </div>
              <div style={{width:'5%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Reste 2022 :   </div>
               
              </div>
              <div style={{width:'5%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Entrée 2023:   </div>
               
              </div>
              <div style={{width:'5%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Sortie 2023:   </div>
               
              </div>
              <div style={{width:'6%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Quantité:   </div>
               
              </div>
              <div style={{width:'6%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Qt.Physique:   </div>
                
              </div>
              <div style={{width:'13%',display :'flex' ,flexDirection :'column'}}>
                <div
                style={{ color :'#5B548E' , fontSize :'15px' ,marginLeft:'10px', marginTop :'20px'}}
                >   Observations:   </div>
               
              </div>
         
              </div>

         {/* ------------------------ */}

          {/* La liste des composants de produit */}
          
          {filteredProducts
.filter(product => product.nom.toLowerCase().includes(searchTerm.toLowerCase()))
.filter(cmd => cmd.quantitéPhysique === '') // Filter inventaire with quantitéPhysique
  .concat(filteredProducts.filter(product => product.nom.toLowerCase().includes(searchTerm.toLowerCase()))
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
                  value={cmdData.nom}
                  

                />
                       
                       </div>
                
              </div>
              <div style={{width:'5%',display :'flex' ,flexDirection :'column'}}>
                
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
                  
                  
                >  {cmdData.ResteAnneePasse } </div>
              </div>
              <div style={{width:'5%',display :'flex' ,flexDirection :'column'}}>
                
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
                  
                  
                >  {cmdData.Entrée } </div>
              </div>
              <div style={{width:'5%',display :'flex' ,flexDirection :'column'}}>
                
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
                  
                  
                >  {cmdData.Sortie } </div>
              </div>

              <div style={{width:'6%',display :'flex' ,flexDirection :'column'}}>
                
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
              <div style={{width:'6%',display :'flex' ,flexDirection :'column'}}>
                
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

             
              <div style={{width:'20%',display :'flex' ,flexDirection :'column'}}>
               
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
                  value={Observations[cmdData.id] || ''}
                  onChange={(e) => ObservationsOnChange(cmdData.id, e)}
                /> 
              </div>
              
             
              <button 
              style={{borderRadius: '20px', height: '45px',   width: '100px' ,   paddingRight :'10px',    display: 'flex',   alignItems: 'center',textDecoration :"none",backgroundColor :'#17BF6B',justifyContent: 'center', color :'white',border :'none',marginTop:'0px',textAlign:'center'}}
              onClick={() => handleSave(cmdData.id, quantity[cmdData.id], Observations[cmdData.id])}>save</button>

              
            </div>
          ))}
         
          </div>
    

     
   
    </div>

    

       
      </div>
    </div>
  );
}

export default EditInventaire2;