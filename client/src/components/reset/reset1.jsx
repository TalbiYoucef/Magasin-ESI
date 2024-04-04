// import React, { useState } from 'react';
// import './card.css';
// import logo from '../../assets/logo.png';
// import { Link } from 'react-router-dom';
// import { useAppContext } from './AppContext'; // Importer le hook de contexte

// function generateRandomCode() {
//   return Math.floor(1000 + Math.random() * 9000); // Génère un code à quatre chiffres
// }

// function Reset1() {
//   const { setEmailValue, setVerificationCodeValue } = useAppContext();
//   const [localEmail, setLocalEmail] = useState('');
//   const [generatedCode, setGeneratedCode] = useState(null);
//   const [emailError, setEmailError] = useState('');
//   const [isValidEmail, setIsValidEmail] = useState(false);

//   const handleEmailChange = (event) => {
//     const email = event.target.value;
//     setLocalEmail(email);
//     // Vérifier le format de l'adresse e-mail
//     const isValid = /\S+@\S+\.\S+/.test(email);
//     setIsValidEmail(isValid);
//     if (!isValid) {
//       setEmailError('Invalid email address');
//     } else {
//       setEmailError('');
//     }
//   };

//   const handleResetPassword = () => {
//     if (!localEmail || emailError) {
//       // Afficher un message d'erreur si l'adresse e-mail est vide ou invalide
//       alert('Please enter a valid email address');
//       return;
//     }

//     const code = generateRandomCode();
//     setGeneratedCode(code); // Stocker le code généré dans l'état local
//     setVerificationCodeValue(code); // Mettre à jour le code de vérification dans le contexte
//     setEmailValue(localEmail);
//     // Envoyer le code à l'adresse e-mail (simulation)
//     console.log(`Code sent to ${localEmail}: ${code}`);
//   };

//   return (
//     <div className="container reset1 mt-5 ">
//       <img className="logo-img" src={logo} alt="My Image" style={{ width: '240px', height: '50px' }} />
//       <div style={{ width: '500px', height: '400px' }} className="container partie2 mt-4 text-center   ">
//         <div className="container text-center   ">
//           <div className="title1">Reset password</div>
//           <div className="description ">
//             To reset your password, please enter the E-mail
//             <br /> address associated with your account
//           </div>
//         </div>
        
//         <div className="container mt-5">
//           <div className="email-box text-center " >
//             <div>
//               <input 
//                 type="email" 
//                 className="email-input" 
//                 placeholder="Enter your email please"
//                 value={localEmail} 
//                 onChange={handleEmailChange} 
//                 required 
//               />
//               {emailError && <div className="error-message">{emailError}</div>}
//             </div>
            
//             <Link 
//               to={isValidEmail ? "/reset2" : "#"} // Rediriger uniquement si l'e-mail est valide
//               className={`btn--reset ${isValidEmail ? "" : "disabled"}`} // Ajouter une classe "disabled" si l'e-mail n'est pas valide
//               onClick={isValidEmail ? handleResetPassword : null} // Appeler la fonction handleResetPassword uniquement si l'e-mail est valide
//             >
//               Reset my password
//             </Link>
//             <Link to="/login" className="return"> Go back to login </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Reset1;
import React, { useState } from "react";
import "./card.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./AppContext"; // Importer le hook de contexte
import emailjs from 'emailjs-com'
function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000); // Génère un code à quatre chiffres
}
function Reset1() {
  const navigate = useNavigate()
  const { setEmailValue, setVerificationCodeValue } = useAppContext();
  const [localEmail, setLocalEmail] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setLocalEmail(email);
    // Vérifier le format de l'adresse e-mail
    const isValid = /\S+@\S+\.\S+/.test(email);
    setIsValidEmail(isValid);
    if (!isValid) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleResetPassword = () => {
    if (!localEmail || emailError) {
      // Afficher un message d'erreur si l'adresse e-mail est vide ou invalide
      alert("Please enter a valid email address");
      return;
    }
    console.log(localEmail);
    
    const code = generateRandomCode();
    setGeneratedCode(code); // Stocker le code généré dans l'état local
    setVerificationCodeValue(code); // Mettre à jour le code de vérification dans le contexte
    setEmailValue(localEmail);
    sendEmail(localEmail,code)
    navigate('/reset2')
  };
  emailjs.init("jyrCv9Oo18Po67QwK");

  // Function to send email
  async function sendEmail(email, code) {
    try {
      const templateParams = {
        email: email,
        code: code
      };
  
      // Send email using EmailJS
      const response = await emailjs.send("service_leyrusl", "template_vhurf4u", templateParams);
      console.log("Email sent successfully:", response);
      return response;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
  
  return (
    <AppProvider>
      <div className="container reset1 mt-5 ">
        <img
          className="logo-img"
          src={logo}
          alt="My Image"
          style={{ width: "240px", height: "50px" }}
        />
        <div
          style={{ width: "500px", height: "400px" }}
          className="container partie2 mt-4 text-center   "
        >
          <div className="container text-center   ">
            <div className="title1">Reset password</div>
            <div className="description ">
              To reset your password, please enter the E-mail
              <br /> address associated with your account
            </div>
          </div>

          <div className="container mt-5">
            <div className="email-box text-center ">
              <div>
                <input
                  type="email"
                  className="email-input"
                  placeholder="Enter your email please"
                  value={localEmail}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
              </div>

              <Link
                to={isValidEmail ? "/reset2" : "#"} // Rediriger uniquement si l'e-mail est valide
                className={`btn--reset ${isValidEmail ? "" : "disabled"}`} // Ajouter une classe "disabled" si l'e-mail n'est pas valide
                onClick={isValidEmail ? handleResetPassword : null} // Appeler la fonction handleResetPassword uniquement si l'e-mail est valide
              >
                Reset my password
              </Link>
              <Link to="/login" className="return">
                {" "}
                Go back to login{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
export default Reset1;
