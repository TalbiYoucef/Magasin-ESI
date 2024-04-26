
import React, { useState, useEffect } from 'react';


function ViewProductModal({onClose}) {
  const [ProduitData, setProduitData] = useState({
    id: 1,
  name: 'PC de bureau',
  description: 'Processeur Intel Core RAM 16 GB DDR4-2400 SDRAM (2 x 16 GB)  Disque dur SATA 6 Gbit/s de 1 To hhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhh' ,
  quantity: 100
  });
   
  const [Produit, setProduit] = useState(ProduitData);

  
  const handleConfirm = () => {
     if(Produit.quantity!=ProduitData.quantity)
    {const confirm = window.confirm(" Do you want  to  change product  quantity   ?");
    if (confirm) { 
       if (Produit.quantity>=0)
       {  
      
      setProduitData({...ProduitData,
       quantity  : Produit.quantity}
        )
        onClose()}
        else{
          alert('quantity must be positive !')

        }
     
      }

        else{
          onClose()        }
}
else{
  onClose() }

}
    

    
 
  return (

    <div className="modal-list-roles" style={{width :'570px' , height :'450px'}}>
    <div className="modal-content-list-roles">     

      <div style={{display:'flex'}}>
      <div style={{display:'flex' , flexDirection :'column' }}>
                    <div style={{  marginLeft: '20px'   ,    color: '#616262' ,fontSize:'14px',  color:'#5B548E'  , fontSize :'18px'}}> Produit : </div>
                <div
                
                style={{
                    display: 'flex' ,
                    alignItems: 'center' ,
                    width: '340px' ,
                    height: '40px' ,
                    borderRadius: '17px' ,
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    padding: '20px ' ,
                    color: 'black' ,

                }}
                >
                 {Produit.name}
                
                </div>
                </div>

                
                <div style={{display:'flex' , flexDirection :'column' }}>
                    <div style={{  marginLeft: '40px'   ,    color: '#616262' ,fontSize:'14px' , color:'#5B548E' , fontSize :'18px'}}> Quantity </div>
                <div
                
                style={{
                    display: 'flex' ,
                    alignItems: 'center' ,
                    width: '130px' ,
                    height: '40px' ,
                    borderRadius: '17px' ,
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    padding: '20px ' ,
                    color: 'black' ,
                    marginLeft: '20px' , 

                }}
                >
                 
                  <input
                    type= 'number'
                    placeholder={Produit.quantity}
                    onChange={(e) =>  setProduit({ ...Produit, quantity: e.target.value })}
                    style={{border :'none',height: '30px' }}
                  />
                </div>
                </div>
                </div>


                <div style={{display:'flex' , flexDirection :'column' , marginTop:'20px'}}>
                    <div style={{  marginLeft: '20px'   ,    color: '#616262' ,fontSize:'14px' ,  color:'#5B548E' , fontSize :'18px'}}> Description : </div>
                <div
                
                style={{
                    alignItems: 'center' ,
                    width: '490px' ,
                    height: '200px' ,
                    borderRadius: '20px' ,
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    padding: '20px ' ,
                    color: 'Black' ,
                }}
                > 
                 {Produit.description}
                </div>
                </div>

<div className='btns'>      
          <button type="button" onClick={handleConfirm} className='create btn' style={{backgroundColor:'#fa9e00' , }}>Ok</button>  
        
        </div>
    
    </div>
  </div>


  );
}

export default ViewProductModal;
