import React, { useEffect, useState } from 'react';
import './CreateReceipt.css';
import Side from '../side/side.jsx'
import Nav from '../nav/nav.jsx'
import { MdNavigateNext } from "react-icons/md";

import CmdData from '../CommandManagement/commandData.jsx'
import CmdComp from './ReceipComposant.jsx';


import { Link } from 'react-router-dom';


function Receip({ selectedCommand }){
  const [receiptNumber, setReceiptNumber] = useState(1); // Numéro de reçu initial
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [Products, setProducts] = useState([]);
  const [cmdDataList, setCmdDataList] = useState([]);
 
  //--------------------
  const handleAddProductEntry = (newProductEntry) => {
    // Logic to handle the addition of a new product entry
    // This could involve updating the state or performing other actions
  };

  // Fonction pour incrémenter le numéro de reçu lors de la création d'un nouveau reçu
  const incrementReceiptNumber = () => {
    setReceiptNumber(prevNumber => prevNumber + 1);
  };
  
//------------------------------------
 
//-----------------------



    
  return(
    <div className="container"style={{marginLeft:0,paddingLeft:0}}>
          <Nav/>
          <div > 
            <Side/>
          </div>
      <div className="row" style={{height:'100vh',display:'flex', alignItems:'center', justifyContent:'center'}}>
        <section className="col-md-12 bordureBleue30" style={{width:'100%',height:'100%',marginLeft:'200px'}}>
          <div className="col-md-5 bordureBleue30 section-230"> 
            <div className="fot30">
                <div className="fotLEFT30">
                <h2 className="rec30">Create Receipt  N°</h2>
                <input type="text" placeholder=''  value={receiptNumber} readOnly/> {/* Champ de texte pour afficher le numéro de reçu */}
                </div>
                <div className="fotR30">Commands List <MdNavigateNext /> </div>
            </div>
            <div className="supCom30">
              <div className="su130">
              <p htmlFor="">Supplier</p>
              <input type="text" name="" id="" className='suppname30' value={selectedCommand ? selectedCommand.supplier : ''}/>{/* Remplir le champ avec le nom du fournisseur de la commande sélectionnée */}
              </div>
              <div className="su230">
              <p htmlFor="">N° Command</p>
              <input type="text" className='nCom30'  value={selectedCommand ? selectedCommand.numCmd : ''} /> {/* Remplir le champ avec le numéro de la commande sélectionnée */}
              </div>
              <div className="su330">
              <p htmlFor="">Date</p>
              <input type="text" className='date30' value={selectedCommand ? selectedCommand.date : ''}/>{/* Remplir le champ avec la date de la commande sélectionnée */}
              </div>
            </div>
            <div className="desi30">
              <p className="tit30">Designations:</p>
              <CmdComp
              selectedCommand={selectedCommand}
  filteredProducts={filteredProducts}
  
  onAddProductEntry={(newProductEntry) => handleAddProductEntry(newProductEntry)}
/>
              
            </div>
            <div className="end30">
              <div className="totht30">
                <p>Total HT</p>
                <input type="text" className='inpHT30' />
              </div>
              <div className="tva30">
                <p>TVA 19%</p>
                <input type="text" className='inpTVA30' />
              </div>
              <div className="totttc30">
               <p>Total TTC</p>
                <input type="text" className='inpTTC30' />
              </div>
              <button className="CONRECEIPT30" onClick={incrementReceiptNumber}>Confirm Receipt</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Receip;
