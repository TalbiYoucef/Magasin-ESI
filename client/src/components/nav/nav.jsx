import React from 'react';
import './nav.css';
import {Link } from 'react-router-dom'
import { IoMoonOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from '../../assets/logo.png';

function Nav(props) {
  return (
    <div>
      <nav className="col-md-12 container-fluid Navigation nav">
        <img className='logo-img' src={logo} alt="My Image" />
        <div className='navright'>
          <IoMdNotificationsOutline className='icn-nav icn-size' />
          <IoMoonOutline className='icn-nav icn-size' />
           <div className='nav-profil'>
          <Link className='link' to={'/setting'}>
          <CgProfile className='icn-nav icn-size' />
          <p className='username'>{props.username}</p>
          </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
