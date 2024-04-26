
import React, { useState, useEffect } from 'react';


function ArticlesModal({ Articles, selectedArticles, onClose, onAddArticles }) {
  const [selected, setSelected] = useState([...selectedArticles]); // Utilisez le spread operator pour créer une copie de selectedPermissions

  const handleSelectArticles = (ArticlesName) => {
    const index = selected.indexOf(ArticlesName);
    if (index === -1) {
      setSelected([...selected, ArticlesName]);
    } else {
      setSelected(selected.filter(Article => Article !== ArticlesName));
    }
  };

  const handleAddArticles = () => {
    if (selected.length === 0) {
      alert('Please select at least one permission!');
      return;
    }
    onAddArticles(selected);
    onClose();
  };

  return (

    <div className="modal-list-roles">
    <div className="modal-content-list-roles">
      <h2 className='title'>Articles </h2>
      <ul className='role-model-list'>
      {Articles.map(Article => (
            <li key={Article.id}>
    <label className="role-model-label">
    <input
                  type="checkbox"
                  value={Article.name}
                  checked={selected.includes(Article.name)}
                  onChange={() => handleSelectArticles(Article.name)}
                />
      <span className="role-model-name">  {Article.name}</span>
    </label>
  </li>
))}
</ul>
<div className='btns'>      
          <button type="button" onClick={onClose} className='cancel btn'>Cancel</button>  
          <button type="button"   onClick={handleAddArticles} className="create btn">Add Articles</button>
        </div>
    
    </div>
  </div>













    

      
  );
}

export default ArticlesModal;
