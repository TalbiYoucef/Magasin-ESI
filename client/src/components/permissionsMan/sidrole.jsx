import React  , { useState } from 'react'
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { PiSquaresFourLight } from "react-icons/pi";
import './sidrole.css';

function Sid() {
    const [selectedItem, setSelectedItem] = useState(null);
    const handleItemClick = (item) => {
      setSelectedItem(item);
    };
  return (
    <div class=" side-bar  container-fluid " > 
    <div className=' container-fluid menu'>
    <a   className={`link ${selectedItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('Dashboard')}  href="#"  >
     <GoHome className='icn'/>
         <p className='side-bar-text'>Dashboard</p>
    </a>
    <a   className={`link ${selectedItem === 'Users management' ? 'active' : ''}`} onClick={() => handleItemClick('Users management')}  href="#"  >
     <CiUser className='icn'/>
         <p className='side-bar-text'>Users management</p>
    </a>
    <a   className={`link ${selectedItem === 'Roles management' ? 'active' : ''}`} onClick={() => handleItemClick('Roles management')}  href="#"  >
     <PiSquaresFourLight className='icn'/>
         <p className='side-bar-text'>Roles management</p>
    </a>
    </div>
   <div className='container-fluid settings '>
    
    <a  className={`link ${selectedItem === 'Setting' ? 'active' : ''}`} onClick={() => handleItemClick('Setting')}  href="#"  >
        <IoSettingsOutline className='icn'/>
         <p className='side-bar-text'>Setting</p>
    </a>


    <a  className={`link ${selectedItem === 'help' ? 'active' : ''}`} onClick={() => handleItemClick('help')}  href="#"  >
         <MdOutlinePrivacyTip  className='icn' />
         <p className='side-bar-text' >Help & Privacy</p>
    </a>


    <a  className={`link ${selectedItem === 'logout' ? 'active' : ''}`} onClick={() => handleItemClick('logout')} href="#"  >
        <LuLogOut  className='icnRed' />
         <p className='side-bar-text-red '>Log Out</p>
    </a>
    </div>
   

</div>
  )
}
export default Sid;