import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user data

  const storeUserName = (newUser) => {
    setUser(newUser); // Update user data
  };

  return (
    <UserContext.Provider value={{ user, storeUserName }}>
      {children}
    </UserContext.Provider>
  );
};
