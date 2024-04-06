import React, { useState } from 'react';
import './ReceipComposant.css';
import { IoMdAdd } from "react-icons/io";

function CmdComp({ selectedCommand, filteredProducts, onAddCmd, onAddProductEntry }) {
  const [productEntries, setProductEntries] = useState([{ selectedPro: '', quantity: '' }]);

  const productOnChange = (e, index) => {
    const { value } = e.target;
    const updatedProductEntries = [...productEntries];
    updatedProductEntries[index].selectedPro = value;
    setProductEntries(updatedProductEntries);
  };

  const quantityOnChange = (e, index) => {
    const { value } = e.target;
    const updatedProductEntries = [...productEntries];
    updatedProductEntries[index].quantity = value;
    setProductEntries(updatedProductEntries);
  };

  const handleAddProductEntry = () => {
    setProductEntries([...productEntries, { selectedPro: '', quantity: '' }]);
  };

  const handleRemoveProductEntry = (index) => {
    const updatedProductEntries = [...productEntries];
    updatedProductEntries.splice(index, 1);
    setProductEntries(updatedProductEntries);
  };
  // Générer les options du menu déroulant basées sur les produits de la commande sélectionnée
 const productOptions = selectedCommand ? selectedCommand.products.map(product => (
    <option key={product.idp} value={product.nommP}>{product.nommP}</option>
  )) : null;//pour definir les produit selon l command choose
  

 

  return (
    <div>
      {productEntries.map((entry, index) => (
        <div className="proQuan30" key={index}>
            <div className="PQ30">
          <div className="pro30">
            <p>Product</p>
            <select onChange={(e) => productOnChange(e, index)} value={entry.selectedPro} className="selpro30">
              <option value="Select product">Select product</option>
                    {productOptions}
              {filteredProducts.map((product, i) => (
                <option key={i} value={product.nom}>{product.nom}</option>
              ))}
            </select>
          </div>
          <div className="quan30">
            <p>Quantité</p>
            <input onChange={(e) => quantityOnChange(e, index)} value={entry.quantity} type="number" placeholder="Quantité" className='qaunNUM30' />
          </div></div>
          <div className="AddRem30">
          {index === productEntries.length - 1 && (
            <div className="add30">
              <button onClick={handleAddProductEntry}><IoMdAdd />Add</button>
            </div>
          )}
           {index !== 0 && (
            <div className='rem30'> 
            <button  onClick={() => handleRemoveProductEntry(index)}>Remove</button>
            </div>
          )}
          </div>
          
        </div>
      ))}
      
    </div>
  );
}

export default CmdComp;
