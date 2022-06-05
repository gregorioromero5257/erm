import {defineStore} from "pinia"
import axios from "axios"
import {useUserStore} from "@/stores/user"
import {tokenAlive} from "@/utils/jwt/jwtHelper"
import {useRouter} from 'vue-router'
import {useDarkModeStore} from "@/stores/dark-mode";
import {auth} from "@/firebase/config"
import {
    GoogleAuthProvider,
    updateProfile,
    signInWithPopup,
    signInWithEmailAndPassword,
    updatePassword,
    signOut,
} from "firebase/auth"

export const useAuthStore = defineStore("auth", {
        state: State => ({
            authData: {
                token: '',
                refreshToken: '',
                tokenExpirationTime: '',
                userData : [],
                auth : []
            },
            isAuthenticated: false
        }),
        getters: {
            isTokenAlive() {
                if (!this.authData.tokenExpirationTime) {
                    return false
                }
                return tokenAlive(this.authData.tokenExpirationTime)
            }
        },
        actions: {
            saveTokenData(data) {
                localStorage.setItem("access_token", data.accessToken)
                localStorage.setItem("refresh_token", data.refreshToken)
                localStorage.setItem("token_expiration", data.expiresIn)
                localStorage.setItem("authData", JSON.stringify(data))

                this.authData  = {
                    token: data.accessToken,
                    refreshToken: data.refreshToken,
                    tokenExpirationTime: data.expiresIn,
                    userData: data.user,
                    auth : data
                }

            },
            saveTokenDataFromRefresh(data) {
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("refresh_token", data.refresh_token)
                localStorage.setItem("token_expiration", data.expires_in)

                this.authData.token = data.access_token
                this.authData.refreshToken = data.refresh_token
                this.authData.tokenExpirationTime = data.expiresIn

            },
            setIsAuthenticated(value) {
                this.isAuthenticated = value
            },
            //promesa del login
            firebaseLogin: function (payload) {
                return new Promise((resolve, reject) => {
                    signInWithEmailAndPassword(auth, payload.email, payload.password).then((response) => {
                        resolve(response)
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            login: async function (payload) {
                return new Promise(async (resolve, reject) => {
                    this.firebaseLogin(payload).then(async (response) => {
                        if (response) {
                            const user = useUserStore()
                            await user.user(response.user.uid, response.user).then(() => {
                                const userData = user.userData
                                const darkModeStore = useDarkModeStore()
                                darkModeStore.setDarkMode(userData.dark_mode)
                                this.setIsAuthenticated(true)
                            })
                            resolve(true)
                        }
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            //
            signInWithGoogle: function () {
                return new Promise(async (resolve, reject) => {
                    const provider = new GoogleAuthProvider(auth)
                    await signInWithPopup(auth, provider)
                        .catch(error => {
                            reject(error)
                        })
                        .then(async (response) => {
                            const user = useUserStore()
                            await user.user(response.user.uid).then(() => {
                                const userData = user.userData
                                const darkModeStore = useDarkModeStore()
                                darkModeStore.setDarkMode(userData.dark_mode)
                                resolve(true)
                            })
                        })
                })
            },
            logout: function () {
                const router = useRouter()
                const darkMode = localStorage.getItem('darkMode')
                localStorage.clear()
                localStorage.setItem('darkMode', darkMode)
                this.setIsAuthenticated(false)
                signOut(auth).then(()=> {
                    router.push('/login')
                })

            },
            refreshToken: function (payload) {
                return new Promise((resolve, reject) => {
                    axios.post(
                        'https://securetoken.googleapis.com/v1/token?key=' + import.meta.env.VITE_API_KEY,
                        payload
                    ).then((refreshResponse) => {
                        this.saveTokenDataFromRefresh(refreshResponse.data)
                        this.setIsAuthenticated(true)
                        resolve(refreshResponse)
                    }).catch(err => {
                        this.setIsAuthenticated(false)
                        reject(err)
                    })
                })
            },
            updateProfile() {
                updateProfile(auth.currentUser, {
                    displayName: this.displayName,
                    photoURL: this.photoURL,

                })
            },
            updatePassword(payload) {
                return new Promise((resolve, reject) => {
                    this.firebaseLogin({
                        email: payload.email,
                        password: payload.old_password
                    }).then((response) => {
                        if (payload.old_password !== payload.new_password) {
                            updatePassword(auth.currentUser, payload.new_password)
                                .then((resp) => {
                                    resolve(true)
                                })
                                .catch(error => {
                                    reject(error)
                                })
                        } else {
                            reject("La Contraseña nueva debe ser distinta a la actual")
                        }
                    }).catch(err => {
                        reject(err)
                    })

                })
            },
            passwordValidateStrength() {
                document
                    .getElementById('passwordFormData')
                    .addEventListener('validatePasswordForm', function (evt) {
                        const passwordFormData = evt.target,
                            valido = document.getElementById('passwordUpdateSuccessMessage'),

                            regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;

                        if (regex.test(passwordFormData.value)) {
                            valido.innerText = "válido";
                        } else {
                            valido.innerText = "incorrecto";
                        }
                    })
            }
        }
    }
)