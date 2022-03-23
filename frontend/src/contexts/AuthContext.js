import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext({
  currentUser: null,
  registerAnAccount: (email, password) => any,
  loginWithPasswordAndEmail: (email, password) => any
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const registerAnAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithPasswordAndEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const value = {
    currentUser,
    registerAnAccount,
    loginWithPasswordAndEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
