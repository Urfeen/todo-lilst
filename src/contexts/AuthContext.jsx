import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userLoading, setUserLoading] = useState(true);

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscriber = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setUserLoading(false);
    });

    return unSubscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signUp, logIn, logOut, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;