import {defineStore} from "pinia"
import {useDarkModeStore} from "@/stores/dark-mode";
import {useAuthStore} from "@/stores/auth"
import * as firebase from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    linkWithPopup,
    updateProfile,
} from "firebase/auth"
import {getFirestore, doc, getDoc, updateDoc, setDoc, addDoc} from "firebase/firestore"

export const useUserStore = defineStore("user", {
    state: State => ({
        userData: [],
    }),
    actions: {
        saveUserDataFromFirebase(data) {
            localStorage.setItem('user', JSON.stringify(data))
            this.userData = data
        },
        resolveUser: function () {
            const userFromStorage = localStorage.getItem('user')
            this.userData = JSON.parse(userFromStorage)
        },
        user: async function (uid, data = false) {
            const db = getFirestore()
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                this.saveUserDataFromFirebase(docSnap.data())
            } else {
                if (data) {
                    const docRef = await setDoc(doc(db, "users", uid), {
                        uid: uid,
                        last_login: data.metadata.lastLoginAt,
                        first_name: '',
                        last_name: '',
                        email: data.email,
                        address: "",
                        position: "",
                        phone: "",
                        providerId: "firebase",
                        dark_mode: false
                    })
                } else {
                    const docRef = await addDoc(doc(db, "users", uid), {
                        uid: uid,
                        first_name: ''
                    })
                }
            }
        },

        //cambio de datos - funcion para envio de datos a firestore
        updateProfileData: function (payload) {
            return new Promise(async (resolve, reject) => {
                const uid = payload.uid
                this.updateUserDocument(
                    uid,
                    payload
                ).then((response) => {
                    const auth = getAuth()
                    //se debe actualizar aqui ............ esta en el auth
                    updateProfile(auth.currentUser, {
                        displayName: payload.first_name + ' ' + payload.last_name
                    })
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateProfilePhoto: function (uid, payload) {
            return new Promise((resolve, reject) => {
                this.updateUserDocument(
                    uid,
                    payload
                ).then((response) => {
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        //darkMode
        darkModeProfile: function (uid, payload) {
            return new Promise((resolve, reject) => {
                this.updateUserDocument(
                    uid,
                    payload
                ).then((response) => {
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        //funcion principal de promesa
        updateUserDocument: async function (uid, payload) {
            return new Promise(async (resolve, reject) => {
                const db = getFirestore()
                const docRef = doc(db, "users", uid)
                updateDoc(
                    docRef,
                    payload
                ).then(async () => {
                    const docSnap = await getDoc(docRef)
                    this.saveUserDataFromFirebase(docSnap.data())
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        }

    }
})
