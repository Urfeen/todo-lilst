import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userLoading, setUserLoading] = useState(true);

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unSubscriber = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setUserLoading(false);
    });

    return unSubscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signUp, logIn, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;