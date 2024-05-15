import React, { useState } from 'react';
import './sidcmd.css';
import { Link } from 'react-router-dom'; // Si vous utilisez React Router
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { PiSquaresFourLight } from "react-icons/pi";
import { LuCommand } from "react-icons/lu";


function Side( props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.roles && user.roles.includes('Administrator');
  const CommandsManagement = user && user.roles && user.roles.includes('Storekeeper'||'Purchasing Agent');

 
 console.log (user)
 
 return (
    <nav className="nav__cont">
      <ul className="navv">
        
        <li className="nav__items ">
          <a href='dashboard' className={`link ${props.link === 'dashboard' ? 'active' : ''}`}  > 
          <GoHome className='ic' />
           Dashboard
           </a>
        </li>
        {isAdmin && (
           <>
        <li className="nav__items ">
        <a href='users' className={`link ${props.link === 'users' ? 'active' : ''}`}   >
        <CiUser className='ic' />
        Users management
        
        
        </a>
        </li>

        <li className="nav__items ">
        <a href='roles' className={`link ${props.link === 'roles' ? 'active' : ''}`}   >
        <PiSquaresFourLight className='ic' />

        Roles  management</a>
        </li>
        </>
        )}
         {CommandsManagement && (
           <>
        <li className="nav__items ">
        <a href='/ExternalOrders' className={`link ${props.link === 'commands' ? 'active' : ''}`}   >
        <LuCommand className='ic' />
        CommandsManagement
        </a>
        </li>
        </>
        )} 
        <li className="nav__items ">
        <a href='setting' className={`link ${props.link === 'setting' ? 'active' : ''}`}   >
        <IoSettingsOutline className='ic' />
        Setting</a>
        </li>


        

        <li className="nav__items ">
        <a href='help' className={`link ${props.link === 'help' ? 'active' : ''}`}   >
        <MdOutlinePrivacyTip className='ic' />
        Help & Privacy </a>
        </li>

        <li className="nav__items ">
        <a href='login'  >
        <FiLogOut className='ic' />
        Log Out </a>
        </li>
      </ul>
    </nav>
  );
}

export default Side;