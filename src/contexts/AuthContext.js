import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unSubscriber = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    });

    return unSubscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;