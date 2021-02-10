import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJpUz5r6lSZ1rX1tjeeVh60IWi5jS6n3E",
    authDomain: "batch6dialogflow.firebaseapp.com",
    databaseURL: "https://batch6dialogflow-default-rtdb.firebaseio.com",
    projectId: "batch6dialogflow",
    storageBucket: "batch6dialogflow.appspot.com",
    messagingSenderId: "814500502105",
    appId: "1:814500502105:web:27e1f83df08bd63be9ef48",
    measurementId: "G-B5GJYNWER7"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export {db};