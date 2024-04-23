import React, { useState , useEffect } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import ProduitData from '../data/ProduitData';
import { Link } from 'react-router-dom';
import CmdComp from '../Create-cmds/cmdComp';

function EditCmdEx() {
    const [commandInfo, setCommandInfo] = useState({
        id: '0',
        numCmd: '1',
        chapitre: 'Chapitre 1',
        Article: 'Article 1',
        supplier: 'Sarl PC STORE',
        date: '04-03-2024',
        state: 'initialized',
        products: [
            { id: 0, selectedPro:  'Produit 2A', quantity: 100 },
            { id: 1, selectedPro: 'Produit 2', quantity: 100 },
            { id: 2, selectedPro: 'Produit 3', quantity: 100 }
        ]
    });

    const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(() => {
        const chapterData = ProduitData.find(chapter => chapter.chapitre === commandInfo.chapitre);

        if (chapterData) {
            const articleData = chapterData.articles.find(article => article.nom === commandInfo.Article);

            if (articleData) {
                const supplierData = articleData.fournisseurs.find(supplier => supplier.nom === commandInfo.supplier);

                if (supplierData) {
                    const products = supplierData.produitsFournis.map(product => ({
                        id: product.id,
                        nom: product.nom,
                        description: product.description,
                        prixUnitaire: product.prixUnitaire
                    }));
                    const filteredProducts = products.filter(product => {
                        return !commandInfo.products.some(cmdProduct => cmdProduct.selectedPro === product.nom);
                    });
    
    
                    setFilteredProducts(filteredProducts);
                }
            }
        }
    }, [commandInfo]);
   
    const [cmdDataList, setCmdDataList] = useState(commandInfo.products);
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
      
      
  
    const handleRemoveCmd = (id) => {
            setCmdDataList(cmdDataList.filter(cmdData => cmdData.id !== id)); 
            const removedCmd = cmdDataList.find(cmdData => cmdData.id === id);
            if (removedCmd) {
              setFilteredProducts([...filteredProducts, { nom: removedCmd.selectedPro }]);
            }
          };

          
    console.log("cmdDataList" ,cmdDataList )   ;

    const handleAddCmd = (cmdData ) => {
      setCmdDataList([...cmdDataList, cmdData]);
      setFilteredProducts(filteredProducts.filter(product => product.nom !== cmdData.selectedPro));
    };

    const handleConfirmCommand = () => {
        const confirm = window.confirm("Are you sure you want to Confirm the command?");
        if (confirm) {
            setCommandInfo({
                id: '0',
                numCmd: '1',
                chapitre: 'Chapitre 1',
                Article: 'Article 1',
                supplier: 'Sarl PC STORE',
                date: '04-03-2024',
                state: 'initialized',
            products: cmdDataList.map(cmd => ({
                id: cmd.id,
                selectedPro: cmd.selectedPro,
                quantity: cmd.quantity
            }))
        });
    }
    window.location.href = '/commandManagement'; 

    };


    

    const handleCancel = () => {
        const confirm = window.confirm("Are you sure you want to cancel the command?");
        if (confirm) {
        setCmdDataList(commandInfo.products);
    };}
  

   
    const handleCmdList= () => {
        const confirm = window.confirm("Are you sure you want to Leave this form ?");
        if (confirm) {
        setCmdDataList([]);
        setFilteredProducts([]);
        window.location.href = '/commandManagement'; 
        }
        };
  
      
    const user = JSON.parse(localStorage.getItem('user'));
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
                          {commandInfo.numCmd }
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
                                                         {commandInfo.date}

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
                 <div style={{
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    height: ' 80px',
    borderRadius: '20px',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    marginBottom: '30px',
        }}>
    
         <div style={{
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    width: '260px',
    fontSize: '15px',
    height: '40px',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
}}>
    {commandInfo.chapitre}
</div>

<div style={{
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    width: '260px',
    fontSize: '15px',
    height: '40px',
    display: 'flex',
    alignItems: 'center', // Pour centrer verticalement
    justifyContent: 'center', // Pour centrer horizontalement
}}>
    {commandInfo.Article}
</div>

<div style={{
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    width: '260px',
    fontSize: '15px',
    height: '40px',
    display: 'flex',
    alignItems: 'center', // Pour centrer verticalement
    justifyContent: 'center', // Pour centrer horizontalement
}}>
    {commandInfo.supplier}
</div>

      </div>


          <div style={{height :' auto'  , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , padding :'30px' }}>
          
          <div style={{ color :'#5B548E' , fontSize :'20px' , marginBottom :'20px'}}>Designations :</div> 
 



 {/* La liste des composants de commande */}
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

export default EditCmdEx;
