// CreateCmd.js
import React, { useState  } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import ProductsData from '../data/Produits';
import { Link } from 'react-router-dom';
import CmdComp from './CmdinterneComp';


//search
import { BsSearch } from "react-icons/bs";

function CreateCmdinterne() {
    const [cmdDataList, setCmdDataList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
 
          const handleRemoveCmd = (id) => {
          // Supprimer la commande avec l'ID spécifié de cmdDataList
        setCmdDataList(cmdDataList.filter(cmdData => cmdData.id !== id)); 
      };
      
 
   // CreateCmd.js

// ...
const handleAddCmd = (cmdData) => {
  if (!cmdDataList.some((cmd) => cmd.id === cmdData.id)) {
    setCmdDataList([...cmdDataList, cmdData]);
    setFilteredProducts(filteredProducts.filter((product) => product.id !== cmdData.id));
  } else {
    alert('This product is already added.');
  }
};



    const handleConfirmCommand = () => {
        const confirm = window.confirm("Are you sure you want to Confirm the command?");
        if (confirm) {
          if (cmdDataList.length>0)
       { const date = new Date().toLocaleDateString('fr-FR');
        const commandeInfo = {
            date: date,
            products: cmdDataList.map(cmd => ({
                id: cmd.id,
                name: cmd.selectedPro,
                quantity: cmd.quantity
            }))
        };
      //  window.location.href =  '/List des  demandes de fourniture  de ce user '; 

    } else{
        alert('please fill in all  the fileds Correctly ')
    }
  }

    };

    const handleCancel = () => {
        const confirm = window.confirm("Are you sure you want to cancel the command?");
        if (confirm) {
        setCmdDataList([]);
             //   window.location.href =  '/List des  demandes de fourniture  de ce user '; 
    };}



    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      if (event.target.value === '') {
        setFilteredProducts([]);
      } else {
        setFilteredProducts(
          ProductsData.filter((product) => {
            // Vérifie si le nom du produit n'est pas déjà présent dans cmdDataList
            return !cmdDataList.some((cmdData) => cmdData.name === product.name) &&
              product.name.toLowerCase().includes(event.target.value.toLowerCase());
          })
        );
      }
    };
    
    
    const handleCmdList= () => {
        const confirm = window.confirm("Are you sure you want to Leave this form ?");
        if (confirm) {
         setCmdDataList([]);
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


              
      
       <div className='Search' style={{marginBottom :'30px'}}>
                <BsSearch className='search-icon'/>
                <input
                  type="text"
                  className='search-input'
                  placeholder="Search prodcts"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{border :'none',height: '30px' }}
                />
              </div>

   
     



          <div style={{height :' auto'  , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , padding :'30px' }}>
          
          <div style={{ color :'#5B548E' , fontSize :'20px' , marginBottom :'30px', marginLeft :'40%'}}>Designations :</div> 
 


          {/* La liste des composants de commande */}
          {cmdDataList.map(cmdData => (
            <div key={cmdData.id}   style={{display :'flex' , gap :'40px' , alignItems: 'center' ,  width :'100%', marginLeft :'10%'}} >
              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div  style={{fontSize:'15px' , color :'#5B548E' , marginLeft:"50px" }}>   Produit:   </div>
              <div  style={{display :'flex', alignItems: 'center' }}>
                <button onClick={() => handleRemoveCmd(cmdData.id)}
              style={{fontSize:'30px', color:"red"  , border :'none' , backgroundColor :'white', marginRight :"10px" }}
              >-</button> 
                <div
                  style={{
                    color: '#666666',
                    borderRadius: '20px',
                    height: '35px',
                    width: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    border :'none',
                    paddingLeft :'20px'
                  }}

                >
                       {cmdData.name}  </div>
                       </div>
                
              </div>

              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'15px' , color :'#5B548E', marginLeft:"35px"}}
                >   Quantité:   </div>
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
                >  {cmdData.quantity} </div>
              </div>

            </div>
          ))}

{filteredProducts.map(Produit => (
          <CmdComp
            filteredProducts={Produit}
            onAddCmd={(cmdData) => {
           handleAddCmd(cmdData);
          }}
          />
        ))}


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
