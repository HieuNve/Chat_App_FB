import firebase from "firebase/app";

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQfkEn7Vkt4dm5WPlCyUO3GgURrDiFMZU",
    authDomain: "chat-app-eec22.firebaseapp.com",
    projectId: "chat-app-eec22",
    storageBucket: "chat-app-eec22.appspot.com",
    messagingSenderId: "706946040382",
    appId: "1:706946040382:web:5398cc0051d342f31b876f",
    measurementId: "G-D42GPC66GR"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost'){
    db.useEmulator('localhost', '8080');
}

export {db, auth};
export  default  firebase;