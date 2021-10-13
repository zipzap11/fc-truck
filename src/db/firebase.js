import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTk6MdtI2xUEL3Zb0h_47fZRguRn1t8DA",
  authDomain: "fctruck-98100.firebaseapp.com",
  databaseURL: "https://fctruck-98100-default-rtdb.firebaseio.com",
  projectId: "fctruck-98100",
  storageBucket: "fctruck-98100.appspot.com",
  messagingSenderId: "219589580826",
  appId: "1:219589580826:web:6c7c6e0a9f0ec34a4bd9a3",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const rdb = firebase.database();
const storage = firebase.storage();
export { db, auth, rdb, storage };
