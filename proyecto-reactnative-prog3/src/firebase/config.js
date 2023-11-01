import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
apiKey: "AIzaSyAanl6dJ4UxoByWlKDpRRjYVJb0roxFXg8",
authDomain: "proyecto-firebase-prog3.firebaseapp.com",
projectId: "proyecto-firebase-prog3",
storageBucket: "proyecto-firebase-prog3.appspot.com",
messagingSenderId: "993411718213",
appId: "1:993411718213:web:5207c64cb2dba0fd58972c"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
