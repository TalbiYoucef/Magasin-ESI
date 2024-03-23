import React, { useState } from 'react';
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { PiSquaresFourLight } from "react-icons/pi";
import './side.css';

function Side() {
  const [selectedItem, setSelectedItem] = useState('Users management'); // Initialisation avec "Users management" comme sélectionné par défaut

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div class="side-bar container-fluid">
      <div className='container-fluid menu'>
        <Link className={`link ${selectedItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('Dashboard')} to="/dashboard">
          <GoHome className='icn' />
          <p className='side-bar-text'>Dashboard</p>
        </Link>

        <Link className={`link ${selectedItem === 'Users management' ? 'active' : ''}`} onClick={() => handleItemClick('Users management')} to="/">
          <CiUser className='icn' />
          <p className='side-bar-text'>Users management</p>
        </Link>

        <Link className={`link ${selectedItem === 'Roles management' ? 'active' : ''}`} onClick={() => handleItemClick('Roles management')} to="/roles">
          <PiSquaresFourLight className='icn' />
          <p className='side-bar-text'>Roles management</p>
        </Link>
      </div>

      <div className='container-fluid settings '>
        <Link className={`link ${selectedItem === 'Setting' ? 'active' : ''}`} onClick={() => handleItemClick('Setting')} href="#">
          <IoSettingsOutline className='icn' />
          <p className='side-bar-text'>Setting</p>
        </Link>

        <Link className={`link ${selectedItem === 'help' ? 'active' : ''}`} onClick={() => handleItemClick('help')} href="#">
          <MdOutlinePrivacyTip className='icn' />
          <p className='side-bar-text' >Help & Privacy</p>
        </Link>

        <Link className={`link ${selectedItem === 'logout' ? 'active' : ''}`} onClick={() => handleItemClick('logout')} href="#">
          <FiLogOut className='icnRed' />
          <p className='side-bar-text-red '>Log Out</p>
        </Link>
      </div>
    </div>
  );
}

export default Side;
