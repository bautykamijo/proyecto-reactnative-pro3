import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
apiKey: "AIzaSyDq0cxg82kr2PBy5qjM1j_R6DQ-1HbywNE",
authDomain: "proyecto-reactnative-pro3.firebaseapp.com",
projectId: "proyecto-reactnative-pro3",
storageBucket: "proyecto-reactnative-pro3.appspot.com",
messagingSenderId: "823531866293",
appId: "1:823531866293:web:af751eb9636358281f56fc"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
