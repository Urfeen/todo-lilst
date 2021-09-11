import React, { createContext, useContext } from 'react';
import { database } from '../firebase';
import { ref, set, onValue } from "firebase/database";

const RtDBContext = createContext();

export function useRtDB() {
  return useContext(RtDBContext);
}

function RtDBProvider({ children }) {

  const getOnValue = (url, setMethod) => {
    const unSubscriber = onValue(ref(database, url), (snapshot) => {
      if (snapshot.exists()) {
        return setMethod(snapshot.val());
      }
      setMethod(null);
    });
    return unSubscriber;
  }

  const setDataByUrl = (url, data) => {
    return set(ref(database, url), data);
  }

  return (
    <RtDBContext.Provider
      value={{
        getOnValue,
        setDataByUrl,
      }}
    >
      {children}
    </RtDBContext.Provider>
  );
}

export default RtDBProvider;