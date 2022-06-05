import {createRouter, createWebHistory} from "vue-router"
import pinia from "@/stores/store"
import {useAuthStore} from "@/stores/auth"
import {useUserStore} from "@/stores/user"
import SideMenu from "../layouts/side-menu/Main.vue"
import SimpleMenu from "../layouts/simple-menu/Main.vue"
import TopMenu from "../layouts/top-menu/Main.vue"
import ErrorPage from "../views/error-page/Main.vue"
import Login from "../views/auth/login/Main.vue"
import Home from "../views/home/Main.vue"
import Profile from "../views/user/Profile.vue"
import CrudTest from "../views/system/test/CrudTest.vue"
import Checkpoint from "../views/erm/checkpoint/report/detail/Main.vue";
import Dashboard from "../views/erm/checkpoint/report/dashboard/Main.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const authStore = useAuthStore(pinia)
const userStore = useUserStore(pinia)

const routes = [
  {
    path: "/profile",
    name: "simple-menu-profile",
    component: Profile,
    meta: {requiresAuth: true}
  },
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
        meta: {requiresAuth: true}
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: {requiresAuth: true}
      },
      {
        path: "/crudtest",
        name: "crud-test",
        component: CrudTest,
        meta: {requiresAuth: true}
      },
      {
        path: "/checkpoint/:id",
        name: "checkpoint",
        component: Checkpoint,
        meta: {requiresAuth: true}
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {requiresAuth: true}
      },

    ]
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "/",
        name: "simple-menu-home",
        component: Home,
        meta: {requiresAuth: true}
      },
      {
        path: "/profile",
        name: "simple-menu-profile",
        component: Profile,
        meta: {requiresAuth: true}
      },
      {
        path: "/crudtest",
        name: "simple-menu-crud-test",
        component: CrudTest,
        meta: {requiresAuth: true}
      },
      {
        path: "/checkpoint/:id",
        name: "simple-menu-checkpoint",
        component: Checkpoint,
        meta: {requiresAuth: true}
      },
      {
        path: "/dashboard",
        name: "simple-menu-dashboard",
        component: Dashboard,
        meta: {requiresAuth: true}
      },

    ]
  },
  {
    path: "/top-menu",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "top-menu-home",
        component: Home,
        meta: {requiresAuth: true}
      },
      {
        path: "/profile",
        name: "top-menu-profile",
        component: Profile,
        meta: {requiresAuth: true}
      },
      {
        path: "/crudtest",
        name: "top-menu-crud-test",
        component: CrudTest,
        meta: {requiresAuth: true}
      },
      {
        path: "/checkpoint/:id",
        name: "top-menu-checkpoint",
        component: Checkpoint,
        meta: {requiresAuth: true}
      },
      {
        path: "/dashboard",
        name: "top-menu-dashboard",
        component: Dashboard,
        meta: {requiresAuth: true}
      },

    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {left: 0, top: 0};
  },
});

//Creamos una promesa para verificar que se el usuario este autentificado
// este se encarga de estar al pendiente de cambios de rutas
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};


router.beforeEach(async (to, from, next) => {

  if (to.matched.some((record) => record.meta.requiresAuth)) {

    if (await getCurrentUser()) {

      if (authStore.authData.token === '') {
        const authData = JSON.parse(localStorage.getItem('authData'))
        if (authData) {
          authStore.saveTokenData({
            accessToken: localStorage.getItem('access_token'),
            refreshToken: localStorage.getItem('refresh_token'),
            expiresIn : localStorage.getItem('token_expiration'),
            user : {
              uid: authData.uid,
              email : authData.email,
              providerId: authData.providerId,
              metadata : authData.metadata
            },
            auth : localStorage.getItem('authData')
          })

          authStore.setIsAuthenticated(true)
        }
      }

      if (!authStore.isTokenAlive && authStore.authData.refreshToken !== '') {
        authStore.refreshToken({
          "grant_type": 'refresh_token',
          "refresh_token": authStore.authData.refreshToken
        })

      }

      if (!authStore.isAuthenticated && to.meta.requiresAuth) {
        return next({name: 'login'})
      }

      if(to.name === 'login' && authStore.isAuthenticated){
        return next({name: 'home'})
      }

      return next()

    }else {
      return next({name: 'login'})
    }
  } else {
    return next();
  }

})

export default router;
