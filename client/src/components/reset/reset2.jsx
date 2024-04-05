import React, { useState } from 'react';
import './card.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAppContext } from './AppContext'; 
import { FaArrowLeft } from "react-icons/fa";

function Reset2() {
  const { verificationCode } = useAppContext();
  const { email } = useAppContext();
  const [enteredCode, setEnteredCode] = useState('');

  const handleCodeChange = (event) => {
    setEnteredCode(event.target.value);
  };

  const handleVerifyCode = () => {
    const enteredCodeNumber = parseInt(enteredCode); // Convertir enteredCode en nombre
    if (enteredCodeNumber === verificationCode) {
      console.log("Verification successful!");
    } else {
      alert("Verification failed! Please enter the correct verification code.");
    }
  };

  return (
    <div className="container reset1 mt-5">
      {console.log(`Code sent to  ${email} ${verificationCode}`)}
      {console.log(`enteredCode   ${enteredCode}`)}

      <img className="logo-img" src={logo} alt="My Image" style={{ width: '240px', height: '50px' }} />
      <div style={{ width: '500px', height: '400px' }} className="container partie2 mt-4 text-center">
      <Link to="/" className="return-flech"><FaArrowLeft /></Link>
        <div className="container text-center">
          <div className="title1">Reset password</div>
          <div className="description">
            Please enter the verification code sent to your email
          </div>
        </div>
        
        <div className="container mt-5">
          <div className="email-box text-center c1">
            <div> <input type="text" className="email-input" placeholder="Enter verification code" value={enteredCode} onChange={handleCodeChange} />  </div>
            <Link to={enteredCode == verificationCode ? "/reset3" : "#"} className="btn--reset" onClick={handleVerifyCode}>Verify</Link>
            <Link to="/login" className="return"> Go back to login </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset2;
