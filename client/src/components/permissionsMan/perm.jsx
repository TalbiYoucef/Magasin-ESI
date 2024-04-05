import React , { useState } from "react";
import './perm.css'



function Perm(props){
    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isVisible, setIsVisible] = useState(true);


return(
    <div>
        {isVisible && (
     <div className='oper'>
     <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}  />
     <p className="name">{props.pername}</p>
     <a href="" className='edi'></a>
     <button   className='del' ></button>
   </div>
   )}
   </div>
)
}
export default Perm