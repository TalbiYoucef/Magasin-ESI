import React , { useState } from "react";

import { Link } from 'react-router-dom';


function PerLine(props,handleViewArticle){
const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    setIsVisible(false);
  };
   
 
return(
    <div>
        {isVisible && (
     <div className='oper'>
     <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}  />
     <p className="name">{props.rolenam}</p>
     <button   className='del'     style={{color :    ' blue'}} onClick={props.handleViewArticle}>View</button>
     <button   className='del' onClick={handleDelete}>Delete</button>
   </div>
   )}
   </div>
)
}
export default PerLine