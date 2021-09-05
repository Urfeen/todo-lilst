import React, { createContext, useContext } from 'react';
import { database } from '../firebase';
import { ref, child, set, onValue, get, push } from "firebase/database";

const RtDBContext = createContext();

export function useRtDB() {
  return useContext(RtDBContext);
}

function RtDBProvider({ children }) {

  const getOnValue = (url) => {
    return onValue(ref(database, url), (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    });
  }
  const getOnValueChild = (url) => {
    const databaseRef = ref(database);
    return onValue(child(databaseRef, url), (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    });
  }

  const getOnceValue = (url) => {
    return get(ref(database, url)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    });
  }
  const getOnceValueChild = (url) => {
    const databaseRef = ref(database);
    return get(child(databaseRef, url)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    });
  }

  const setDataByUrl = (url, data) => {
    return set(ref(database, url), data);
  }
  const delDataByUrl = (url) => {
    return ref(database, url).remove();
  }

  const getKey = (forUrl) => {
    return push(child(ref(database), forUrl)).key;
  }

  return (
    <RtDBContext.Provider
      value={{
        setDataByUrl,
        getOnValue,
        getOnValueChild,
        getOnceValue,
        getOnceValueChild,
        delDataByUrl,
        getKey
      }}>
      {children}
    </RtDBContext.Provider>
  );
}

export default RtDBProvider;