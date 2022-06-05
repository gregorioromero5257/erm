import axios from "axios"
import pinia from "@/stores/store"
import {useAuthStore} from "@/stores/auth";
import  {auth} from "@/firebase/config"
import jwtInterceptor from "../utils/jwt/jwtInterceptor";
const authStore = useAuthStore(pinia)

const intercept = (handler) => {
    handler.interceptors.request.use(config => {
        const isAuthenticated = authStore.isAuthenticated

        if (isAuthenticated) {
            config.headers.common['Authorization'] =  'Bearer ' + authStore.authData.token
            return config
        } else {
            const payload = {
                "grant_type" : "refresh_token",
                "refresh_token" : authStore.authData.refreshToken
            }
            authStore.refreshToken(payload)
                .then(response => {
                    cprAxios(config)
                }).catch(err => {
                cprAxios(config)
            })
        }
    })
}

const cprAxios = axios.create({})
cprAxios.defaults.baseURL = import.meta.env.VITE_API_CHECKPOINT_REPORTS_URL
intercept(cprAxios)

//const xxhandler = axios.create({})
//xxhandler.defaults.baseURL = import.meta.env.VITE_API_XX_ENDPOINT
//xxhandler.defaults.headers.common['Authorization'] = "Bearer "+AUTH_TOKEN;




export {cprAxios}




//export {cprHandler,xxHandler}