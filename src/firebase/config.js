import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBThEipJVS-73wAeU8j1Fea0a4DGTPWIFE",
    authDomain: "fashion-designer-project.firebaseapp.com",
    projectId: "fashion-designer-project",
    storageBucket: "fashion-designer-project.appspot.com",
    messagingSenderId: "550302114338",
    appId: "1:550302114338:web:c462237ea559de1a0c607b"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const projectFirestore = firebase.firestore()
const projectStorage = firebase.storage()
const projectAuth = firebase.auth()

// const timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { projectFirestore, projectStorage, projectAuth, timestamp }