import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

const AuthContext = createContext({
  currentUser: null,
  isLoanding: true,
  registerAnAccount: (email, password) => any,
  loginWithPasswordAndEmail: (email, password) => any,
  logoutTheCurrentUser: () => any,
  signInWithGooglePopup: () => any
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

  const logoutTheCurrentUser = () => {
    return signOut(auth);
  };

  const signInWithGooglePopup = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(localStorage);
        localStorage.setItem('isLoggedUser', JSON.stringify(true));
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    registerAnAccount,
    loginWithPasswordAndEmail,
    logoutTheCurrentUser,
    signInWithGooglePopup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
