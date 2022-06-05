import * as firebase  from "firebase/app"
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyACTXkMZgBIrjb8Q4G_1PzPtND7W9zF0vg",
    authDomain: "cmatik-pro-resources.firebaseapp.com",
    projectId: "cmatik-pro-resources",
    storageBucket: "cmatik-pro-resources.appspot.com",
    messagingSenderId: "656292475224",
    appId: "1:656292475224:web:39afa9e261f6af8e5bb52d",
    measurementId: "G-4486R9BZH6"
};


firebase.initializeApp(firebaseConfig)

const auth = getAuth()


export { auth }