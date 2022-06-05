import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import globalComponents from "./global-components"
import utils from "./utils"
import "./libs"
import "./assets/css/app.css"
import pinia from "@/stores/store"
import {useAuthStore} from "@/stores/auth"
import {auth} from "@/firebase/config"
import {useUserStore} from '@/stores/user'

const app = createApp(App)
    app.use(router)
        .use(createPinia())
globalComponents(app)
utils(app)

const authStore = useAuthStore(pinia)

app.mount("#app")

auth.onAuthStateChanged(user => {
    if (user !== null) {
        const tokenData = {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expiresIn : user.stsTokenManager.expirationTime,
            user : {
                uid: user.uid,
                email : user.email,
                providerId: user.providerId,
                metadata : user.metadata
            },
            auth : user.auth
        }
        authStore.setIsAuthenticated(true)
        authStore.saveTokenData(tokenData)

    }
})
