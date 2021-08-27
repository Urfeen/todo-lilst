import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.TODO_LIST_FIREBASE_API_KEY,
  authDomain: process.env.TODO_LIST_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.TODO_LIST_FIREBASE_PROJECT_ID,
  storageBucket: process.env.TODO_LIST_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.TODO_LIST_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.TODO_LIST_FIREBASE_APP_ID
});

export const auth = app.auth();
export default app;