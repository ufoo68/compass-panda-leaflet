import firebase from 'firebase'
import "firebase/firestore"
import config from './config.json'

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

export {db};