// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(''); // Nouvelle variable d'état pour le code de vérification

  
  const setEmailValue = (value) => {
    setEmail(value);
  };

  const setVerificationCodeValue = (code) => {
    setVerificationCode(code);
  };

  return (
    <AppContext.Provider value={{ email, setEmailValue, verificationCode, setVerificationCodeValue }}>
      {children}
    </AppContext.Provider>
  );
};
