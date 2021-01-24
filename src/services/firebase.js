import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB4bbK96DIEATfjitJ5UQQUSzdl-R38N94",
  authDomain: "react-firebase-chat-11475.firebaseapp.com",
  databaseURL: "https://react-firebase-chat-11475-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-firebase-chat-11475",
  storageBucket: "react-firebase-chat-11475.appspot.com",
  messagingSenderId: "827011982377",
  appId: "1:827011982377:web:c933a520296953eb9ba838",
  measurementId: "G-SQ6ZP0PB7X"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const database = firebase.database();
export const firestore = firebase.firestore();
