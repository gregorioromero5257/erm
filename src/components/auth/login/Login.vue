<template>
  <form>
    <auth-main>
      <!-- alerta de notificacion de error para loguear-->
      <div class="intro-y alert alert-danger-soft flex items-center my-2" v-if="errorLoginMessage">
        <AlertOctagonIcon class="w-6 h-6 mr-2"/>
        {{ errorLoginMessage }}
      </div>
      <div class="intro-x mt-8">
        <input
            type="text"
            class="intro-x login__input form-control py-3 px-4 block "
            placeholder="Email"
            autocomplete="on"
            v-on:keyup.enter="login()"
            v-model.trim="validate.email.$model"
            :class="{ 'border-theme-24': validate.email.$error }"/>

        <template v-if="validate.email.$error">
          <div
              v-for="(error, index) in validate.email.$errors"
              :key="index"
              class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
        <input
            type="password"
            class="intro-x login__input form-control py-3 px-4 block mt-4"
            placeholder="Password"
            autocomplete="on"
            v-model.trim="validate.password.$model"
            v-on:keyup.enter="login()"
            :class="{ 'border-theme-24': validate.password.$error }"
        />
        <template v-if="validate.password.$error">
          <div
              v-for="(error, index) in validate.password.$errors"
              :key="index"
              class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>
      <div
          class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"
      >
        <div class="flex items-center mr-auto">
          <input
              id="remember-me"
              type="checkbox"
              class="form-check-input border mr-2"
          />
          <label class="cursor-pointer select-none" for="remember-me"
          >Remember me</label
          >
        </div>
        <a href="">Forgot Password?</a>
      </div>
      <div class="grid grid-cols-8 gap-5 mt-5 ">
        <div class="intro-x lg:mt-5  lg:text-left col-span-8 lg:col-span-4 md:col-span-4">

          <loading-button
              class=" btn btn-primary py-3 px-4 w-full md:w-full lg:w-full align-top"
              caption="Login"
              btnId="btn-login"
              ref="loginBtn"
              :callbackFunction="clickedLogin">
          </loading-button>

        </div>

        <div class=" lg:mt-5  col-span-8 lg:col-span-4 md:col-span-4" >

            <loading-button
                class=" btn btn-outline-secondary py-3 px-4 w-full md:w-full lg:w-full align-top"
                :callbackFunction="loginGoogle"
                btnId="btn-login-google"
                ref="loginGoogleBtn"
                caption="Login con Google">
              <!-- ref hacerlo visible en la vista actual, se debe de crear la funcion abajo -->
              <img
                  alt=""
                  id="loading-btn"
                  class="mr-3 pl-1 h-5 w-6"
                  src="https://storage.googleapis.com/cmatik-dev-alternate-site/google.png"
              />
            </loading-button>

        </div>
      </div>

      <div
          id="success-notification-content"
          class="toastify-content hidden flex">
        <CheckCircleIcon class="text-success text-2xl"/>
        <div class="ml-4 mr-4">
          <div class="font-medium">Login Correcto!</div>
          <div class="text-gray-600 mt-1">
            Bienvenido a ERM2
          </div>
        </div>
      </div>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <div
          id="failed-notification-content"
          class="toastify-content hidden flex">
        <!--XCircleIcon-->
        <CheckCircleIcon class="text-danger text-2xl"/>
        <div class="ml-4 mr-4">
          <div class="font-medium">Login incorrecto</div>
          <div class="text-gray-600 mt-1">
            Verifique sus datos
          </div>
        </div>
      </div>
    </auth-main>
  </form>

</template>

<script setup>
import {ref, toRefs, reactive} from "vue";
import LoadingButton from "@/components/button/LoadingButton.vue"
import AuthMain from "@/components/auth/AuthMain.vue"

import useVuelidate from '@vuelidate/core'
import {
  required,
  email
} from '@vuelidate/validators'
import {useAuthStore} from "@/stores/auth.js"
import Toastify from "toastify-js";
import {useRouter} from 'vue-router';

const loginBtn = ref()
const loginGoogleBtn = ref()


const router = useRouter()
const errorLoginMessage = ref("")
const formData = reactive({
  email: "",
  password: "",
});
const rules = {
  email: {
    required,
    email,
  },
  password: {
    required
  }
}
const validate = useVuelidate(rules, toRefs(formData));

const loginFailedMessage = () => {
  Toastify({
    node: dom('#failed-notification-content')
        .clone()
        .removeClass('hidden')[0],
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true
  }).showToast()
}

const loginSuccessMessage = () => {
  Toastify({
    node: dom('#success-notification-content')
        .clone()
        .removeClass('hidden')[0],
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true
  }).showToast()
}

const clickedLogin = async () => {
  await login().then(response => {
    loginSuccessMessage()
    router.push("/")
  }).catch(err => {
    loginBtn.value.finishLoading()
    loginFailedMessage()
  })
}

const login = () => {
  return new Promise(async (resolve, reject) => {
    validate.value.$touch();
    if (validate.value.$invalid) {
      reject('Error de validación')
    } else {
      const auth = useAuthStore()
      await auth.login({
        email: formData.email,
        password: formData.password
      }).then(response => {
        if (auth.isAuthenticated === true) {
          //loginSuccessMessage()
          //router.push("/")
          resolve(true)
        }
      }).catch(err => {

        switch (err.code) {
          case 'auth/invalid-email':
            errorLoginMessage.value = 'Correo electronico no válido'
            break
          case 'auth/user-not-found':
            errorLoginMessage.value = 'Email y/o Password no válido'
            break
          case 'auth/wrong-password':
            errorLoginMessage.value = 'Email y/o Password no válido'
            break
          default:
            console.log(err)
            errorLoginMessage.value = 'Error en el sistema'
            break
        }
        reject(errorLoginMessage)
      })
    }


  })
}

const loginGoogle = async () => {
  const auth = useAuthStore()
  await auth.signInWithGoogle()
      .then(response => {
        if (auth.isAuthenticated === true) {
          loginSuccessMessage()
          router.push("/")
        }
      }).catch(err => {
        loginGoogleBtn.value.finishLoading()
        console.log(err)
      })

}

function clickEnviar(boton) {
  boton.disabled = true;
}

</script>
