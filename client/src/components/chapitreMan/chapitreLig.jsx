import React , { useState } from "react";
import './chapitreLig.css'
import { Link } from 'react-router-dom';


function Rollig(props){
    const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleViewRole = () => {
    props.onView(props.rolenam);
   
    };

  const handleDelete = () => {
    setIsVisible(false);
  };
   
 
return(
    <div>
        {isVisible && (
     <div className='oper'>
     <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}  />
     <p className="name">{props.rolenam}</p>
     <Link   className='edi' onClick={handleViewRole}>View</Link>
     <button   className='del' onClick={handleDelete}>Delete</button>
   </div>
   )}
   </div>
)
}
export default Rollig