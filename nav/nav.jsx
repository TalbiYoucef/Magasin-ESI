import React from 'react'
import './nav.css'
import { IoMoonOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from '../../assets/logo.png' ; 
function Nav() {
  return (
    <div>
    <nav class="col-md-12 container-fluid Navigation nav  "  >
    <img className='logo-img' src={logo} alt="My Image"  />
    <div className=' navright' >
        <IoMdNotificationsOutline className='icn icn-size'  />
        <IoMoonOutline   className='icn icn-size' />
        <CgProfile   className='icn icn-size' />
        <p  className='username' >Aouaichia hafsa</p>   
</div>
</nav>
</div>
  )
}

export default Nav