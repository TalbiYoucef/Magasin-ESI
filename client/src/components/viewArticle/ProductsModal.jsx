
import React, { useState, useEffect } from 'react';

function ProductsModal({ Products, selectedProducts, onClose, onAddProducts }) {
  const [selected, setSelected] = useState([...selectedProducts]); // Utilisez le spread operator pour créer une copie de selectedPermissions

  const handleSelectProducts = (ProductsName) => {
    const index = selected.indexOf(ProductsName);
    if (index === -1) {
      setSelected([...selected, ProductsName]);
    } else {
      setSelected(selected.filter(Product => Product !== ProductsName));
    }
  };

  const handleAddProducts = () => {
    if (selected.length === 0) {
      alert('Please select at least one permission!');
      return;
    }
    onAddProducts(selected);
    onClose();
  };

  return (

    <div className="modal-list-roles">
    <div className="modal-content-list-roles">
      <h2 className='title'>Products </h2>
      <ul className='role-model-list' style={{ maxHeight : '300px' , overflowY:'auto'}}>
      {Products.map(Product => (
            <li key={Product.id}>
    <label className="role-model-label">
    <input
                  type="checkbox"
                  value={Product.name}
                  checked={selected.includes(Product.name)}
                  onChange={() => handleSelectProducts(Product.name)}
                />
      <span className="role-model-name">  {Product.name}</span>
    </label>
  </li>
))}
</ul>
<div className='btns'>      
          <button type="button" onClick={onClose} className='cancel btn'>Cancel</button>  
          <button type="button"   onClick={handleAddProducts} className="create btn" style={{width:'700px' }}>Add Products</button>
        </div>
    
    </div>
  </div>





      
  );
}

export default ProductsModal;
