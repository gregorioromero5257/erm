import axios from "axios"
import pinia from "@/stores/store"
import { useAuthStore } from "@/stores/auth"
import { useUserStore } from "@/stores/user"

const jwtInterceptor = axios.create({})

const auth = useAuthStore(pinia)
const user = useUserStore(pinia)

jwtInterceptor.defaults.baseURL = import.meta.env.VITE_API_GW_ENDPOINT
axios.defaults.baseURL = import.meta.env.VITE_API_GW_ENDPOINT

jwtInterceptor.interceptors.request.use(config => {
    const isAuthenticated = auth.isTokenAlive()
    const authData = auth.authData

    if (isAuthenticated) {
        config.headers.common['Authorization'] =  'Bearer ' + authData.isTokenAlive
        return config
    } else {
        const payload = {
            "grant_type" : "refresh_token",
            "refresh_token" : authData.refreshToken
        }
        auth.refreshToken(payload)
        .then(response => {
            auth.saveTokenDataFromRefresh(response)
            
            user.user(response.data.userId)
            jwtInterceptor(config)
        }).catch(err => {
            jwtInterceptor(config)
        })
    }
})

jwtInterceptor.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        if (error.reponse.status === 401) {
            const authData = store.getters['getAuthData']

            const payload = {
                "grant_type" : "refresh_token",
                "refresh_token" : authData.refreshToken
            }
            auth.refreshToken(payload)
            .then(response => {
                user.user(response.data.userId)
            })

            return axios(error.config)
        } else {
            return Promise.reject(error)
        }
    }
)

export default jwtInterceptor