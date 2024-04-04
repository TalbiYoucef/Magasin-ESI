// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfos, setUserInfos] = useState(null);

  const setUser = (user) => {
    setUserInfos(user);
    console.log("user");
    console.log(user);

  };

  return (
    <UserContext.Provider value={{ userInfos, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
