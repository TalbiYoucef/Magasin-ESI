// CreateCmd.js
import React, { useState  } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import { Link } from 'react-router-dom';
import DechargeComp from './DechargeComp';

function CreateDecharge() {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [cmdDataList, setCmdDataList] = useState([]);
    const [Products, setProducts] = useState([]);
    const [UserService, setUserService] = useState('comité des oeuvres sociales ');


    const [Decharge, setDecharge] = useState({
      products: [
        { id: 0, selectedPro: 'Vidéo projecteur EPSON', NumInventaire: 'MAV-01-2023',quantity :'30' , Observations: 'observation' },
        { id: 1, selectedPro: 'Vidéo projecteur EPSON',  NumInventaire: 'INV7890', quantity :'30' ,Observations: 'observations' },
        { id: 2, selectedPro: 'Imprimante HP LaserJet Pro MFP M28w', NumInventaire: 'INV9012', quantity :'30' ,Observations: 'observations' },
        { id: 3, selectedPro: 'Scanner Epson Perfection V600', NumInventaire: 'INV3456',quantity :'30' , Observations: 'observations' },
        { id: 4, selectedPro: 'Casque audio Bose QuietComfort 35 II', NumInventaire: 'INV7890',quantity :'30' , Observations: 'observations' },
        { id: 5, selectedPro: 'Souris Logitech MX Master 3',  NumInventaire: 'INV1234',quantity :'30' , Observations: 'observations' }
      ]
    });


  const [filteredProducts, setFilteredProducts] = useState(Decharge.products);

       
    const handleAddCmd = (cmdData ) => {
      console.log('handleAddCmd :cmdData',cmdData) ; 
      setCmdDataList([...cmdDataList,cmdData]);
      console.log('cmdDataList: cmdDataList', cmdDataList);
      setFilteredProducts(filteredProducts.filter(product => product.selectedPro !== cmdData.selectedPro));
      console.log('filteredProducts: handleAddCmd', filteredProducts);

    };

    const handleRemoveCmd = (id) => {
      setCmdDataList(cmdDataList.filter(cmdData => cmdData.id !== id)); 
      console.log("cmdDataList" ,cmdDataList )   ;

      const removedCmd = cmdDataList.find(cmdData => cmdData.id === id);
      if (removedCmd) {
        setFilteredProducts([...filteredProducts, { selectedPro: removedCmd.selectedPro }]);
      }
    };

    const handleConfirmCommand = () => {
        const confirm = window.confirm("Are you sure you want to Confirm the Discharge note?");
        if (confirm) {
          if (cmdDataList.length>0)
       { const date = new Date().toLocaleDateString('fr-FR');
        const DechargeInfo = {
            Service: UserService,
            date: date,
            products: cmdDataList.map(cmd => ({
                idp: cmd.id,
                nommP: cmd.selectedPro,
                NumSairie:cmd.NumSairie,
                NumInventaire:cmd.NumInventaire,
                quantityAccordée:cmd.quantityAccordée,
                quantityDemandée:cmd.quantityDemandée,
                Observations:cmd.Observations,  
                      }))
        };
        console.log('DechargeInfo:', DechargeInfo);
      //  window.location.href =  '/List des  demandes de fourniture   interne  '; 
    } else{
        alert('please fill in all  the fileds Correctly ')
    }
  }

    };

    const handleCancel = () => {
        const confirm = window.confirm("Are you sure you want to cancel the Form?");
        if (confirm) {
         setCmdDataList([]);
        setFilteredProducts([]);
        setProducts([]);
             //   window.location.href =  '/view   fourniture  de ce   decharge  '; 


    };}

    const handleCmdList= () => {
        const confirm = window.confirm("Are you sure you want to Leave this form ?");
        if (confirm) {
          setCmdDataList([]);
        setFilteredProducts([]);
        setProducts([]);
     
             //   window.location.href =  '/view   fourniture  de ce   decharge  '; 
            }
        };
  
    const today = new Date().toLocaleDateString('fr-FR');
return (
    <div> 
      <Nav />
      <div className='dwnusers'>
        <Side    link='commands'/>    
        <div   style={{ marginTop :"8vh" , marginLeft :' 7%' , width :'90%', height :'92vh' , padding :'60px'}}   >
                <div className='crcmd1' style={{display :'flex ' , alignItems: 'center', justifyContent:  'space-between'  , gap : '200px' , marginBottom :'30px' }}>
                   <div style={{ display :'flex ' , gap : '20px'}}>
                    <div className='titre11' style={{ color :'#5B548E' , fontSize :'20px'}}> Create Discharge  Note </div>
                   
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
                          width: '200px' ,
                          padding :'10px' , 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', 
                          boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                          textDecoration :"none",
                          backgroundColor :'#100B39',
                          color :'white'
                        }}>  Internal Orders List     </Link>
                 </div>
      


          <div style={{height :' auto'  , borderRadius : '20px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' , padding :'30px' }}>
          
          <div style={{ color :'#5B548E' , fontSize :'20px' , marginBottom :'30px', marginLeft :'40%'}}>Designations :</div> 
 
          {/* La liste des composants de commande */}
          {cmdDataList.map(cmdData => (
            <div key={cmdData.id}   style={{display :'flex' , gap :'20px' , alignItems: 'center' ,  width :'100%', marginLeft :'1%'}} >
              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div  style={{fontSize:'15px' , color :'#5B548E' , marginLeft:"50px"}}>   Product:   </div>
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
                  }} >
                  {cmdData.selectedPro}  
                </div>
                       </div>
               </div>

               <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'15px' , color :'#5B548E', marginLeft:"30px"}}
                >   N° Inventaire:   </div>
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
                >  {cmdData.NumInventaire} </div>
              </div>


              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'15px' , color :'#5B548E', marginLeft:"10px"}}
                >  Q.Demandé:   </div>
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
                >  {cmdData.quantityDemandée} </div>
              </div>

              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'15px' , color :'#5B548E', marginLeft:"10px"}}
                >  Q.Accordée:   </div>
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
                >  {cmdData.quantityAccordée} </div>
              </div>

              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'15px' , color :'#5B548E', marginLeft:"30px"}}
                >   N° Sairie:   </div>
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
                >  {cmdData.NumSairie} </div>
              </div>
 
              <div style={{display :'flex' ,flexDirection :'column'}}>
                <div
                style={{fontSize:'15px' , color :'#5B548E', marginLeft:"30px"}}
                >   Observations:   </div>
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
                >  {cmdData.Observations} </div>
              </div>
            </div>

            
          ))}
          <DechargeComp
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

export default CreateDecharge;
