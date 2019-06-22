import firebase from 'firebase'
import "firebase/firestore"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA5yB1jqFhrYUJ5fQO4Uq1fK6rSBP1pFzo",
    authDomain: "compasspanda-eb549.firebaseapp.com",
    databaseURL: "https://compasspanda-eb549.firebaseio.com",
    projectId: "compasspanda-eb549",
    storageBucket: "compasspanda-eb549.appspot.com",
    messagingSenderId: "311837323957",
    appId: "1:311837323957:web:b213d5103e7f8512"
});

const db = firebaseApp.firestore();

export {db};