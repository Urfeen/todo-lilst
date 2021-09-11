import * as firebase from "firebase/app"

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDag_AO5Gabdn0O85SGVejgq8bJ1GZqUxY",
  authDomain: "todo-list-development-dac75.firebaseapp.com",
  databaseURL: "https://todo-list-development-dac75-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-list-development-dac75",
  storageBucket: "todo-list-development-dac75.appspot.com",
  messagingSenderId: "307678707726",
  appId: "1:307678707726:web:b173c333e9f2f7f55dfc5f"
});

export const database = getDatabase();
export const auth = getAuth();
export default app;