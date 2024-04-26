import React, { useState , useEffect } from 'react';
import Side from '../side/side.jsx';
import Nav from '../nav/nav.jsx';
import PerLine from './ProLine.jsx';
import Baarr from './Bar.jsx';
import ProductsModal from './ProductsModal.jsx';
import ProductsData from '../data/Produits.jsx';
import ViewProductModal  from '../ViewProduct/ViewProductModal.jsx';

function ViewArticles() {

    const [user ,setuser] =useState({
        id: '0', 
      username: 'hafsa Aouaichia', 
      photo: '../../assets/logo.png', 
      password: '267517',    
      firstname: 'Hafsa', 
      lastname: 'Aouaichia', 
      address: 'El Matmar, Relizane', 
      phone: '+213 0553454437', 
      email: 'h.aouaichia@esi-sba.dz', 
      status: 'enable', 
      role : 'Administrator',
      roles: ['Director', 'Administrator', 'Storekeeper'],  
    }) 
    
    const [ArticleData, setArticleData] = useState({
        name: 'Article 1' ,
        Products: ['Pro 1' , 'Pro 2'],
      }); 


    const [Article, setArticle] = useState(ArticleData);

 console.log('ArticleData//',ArticleData)  ;
 console.log('ArticleArticle//',Article)  ;

   const [showProductsModal, setShowProductsModal] = useState(false);
   const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(Article.Products);

  const handleViewProduct = ()  =>{
    setShowProductModal(true); 
  }

  const ProductsList = Article.Products.map((Product, index) => (
    <PerLine key={index} rolenam={Product}   handleViewProduct={handleViewProduct} /> 
  ));



  const handleAddProducts = (Products) => {
    setSelectedProducts(Products);
    setShowProductsModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  }; 
 
  useEffect(() => {
    setArticle({ ...Article, Products: selectedProducts });
  }, [selectedProducts]); 

  


  const handleConfirm = () => {
    const confirm = window.confirm("Are you sure you want to Confirm the Article ?");
    if (confirm) {
        setArticleData({
            name: Article.name,
            Products : Article.Products 
        })
        console.log('ChapterData confirm //',ArticleData)  ;
    };
    console.log('ChapterData  non //',ArticleData)  ;

}



  return (
    <div>
      <Nav username={user.username} />
      <div style={{display:'flex' ,height  :'92vh' }}>
        <Side  link="roles" />
          <div
          style={{
            width: '85%' ,
            marginLeft: '10%' ,
            marginTop:' 8vh'
          }}
          >
            <div 
            style={{
                position: 'fixed' ,
                height: '22vh' , 
                backgroundColor: 'white' ,
                width: '85%'
            }}
            
            >
              <div 
              style={{
                display: 'flex' ,
                alignItems: 'center' ,
            justifyContent:' space-between ',
              }}
              
              >
                <div style={{display:'flex' , flexDirection :'column' , marginTop:'20px'}}>
                    <div style={{  marginLeft: '60px'   ,    color: '#616262' ,fontSize:'14px'}}> Article name </div>
                <div
                
                style={{
                    display: 'flex' ,
                    alignItems: 'center' ,
                    width: '280px' ,
                    height: '40px' ,
                    borderRadius: '20px' ,
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    padding: '20px ' ,
                    color: '#616262' ,
                    marginLeft: '40px' , 

                }}
                >
                 
                  <input
                    type="text"
                    placeholder={Article.name}
                    onChange={(e) => setArticle({ ...Article, name: e.target.value })}
                    style={{border :'none',height: '30px' }}
                  />
                </div>
                </div>
                <div 
                style={{

                    display: 'flex' ,
                    gap : '20px'  ,
                    marginRight : '40px' , 
                }}
                
                >
                <button  
                 style={{
                    textDecoration: 'none',
                    width: '140px',
                    height: '40px',
                    borderRadius: '30px',
                    marginTop: '30px',
                    transition: 'border-color 0.3s ease',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '500', // medium
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                    textAlign: 'center' ,
                    backgroundColor :'#0047FF' , 
                    boxShadow :"none"  ,
                    border:'none' , 
                    color :'white'
                  }}
                  
                type="button" onClick={() => setShowProductsModal(true)} >Add Products</button>


                 
<button
    style={{
        textDecoration: 'none',
        width: '140px',
        height: '40px',
        borderRadius: '30px',
        marginTop: '30px',
       
        transition: 'border-color 0.3s ease',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '500', // medium
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        textAlign: 'center' ,
        backgroundColor :'#FA9E15' , 
        boxShadow :"none"  ,
        border:'none' , 
        color :'white'
      }}
    onClick={handleConfirm}> Articles  List </button>


{showProductsModal && (
  <ProductsModal
  Products={ProductsData}
    selectedProducts={selectedProducts}
    onClose={() => setShowProductsModal(false)}
    onAddProducts={handleAddProducts}
  />
)}


{showProductModal && (
  <ViewProductModal
  onClose={() => setShowProductModal(false)}

  />
)}
                </div>
              </div>
              <Baarr />
            </div>
            <div
            style={{
                paddingtop: '20px' ,
                marginTop:'30vh' ,
                width:  '85%' ,
                marginLeft: '20px' ,
            }}
            >
              {ProductsList}
            </div>
          </div>
       
      </div>
     
      

    </div>
  );
}

export default ViewArticles;
