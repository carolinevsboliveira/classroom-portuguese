import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const AuthContext = createContext({
  currentUser: null,
  registerAnAccount: (email, password) => any
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const registerAnAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const value = {
    currentUser,
    registerAnAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
