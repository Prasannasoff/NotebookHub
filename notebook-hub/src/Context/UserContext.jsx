import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  // Save to localStorage whenever userDetails is updated
  const updateUserDetails = (details) => {
    setUserDetails(details);
    localStorage.setItem('userDetails', JSON.stringify(details));
  };
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails: updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
