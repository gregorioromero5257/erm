<template>
  <div class=" intro-y flex w-full justify-between p-4">
    <div class="text-primary text-2xl font-medium dark=text-while dark:text-white">
      Perfil de Usuario
    </div>
    <div class="flex space-x-4 ">
      <dark-mode-switcher @userDarkModeChanged="changeUserDarkMode"></dark-mode-switcher>
    </div>

  </div>
  <div class="intro-y w-full h-full space-y-5 ">

    <div class=" grid grid-cols-8 box"> <!-- capa general-->
      <div class="col-span-8 lg:col-span-4 md:col-span-4 items-center">
        <!-- capa de la foto, nombre y cargo-->

        <div class=" grid grid-cols-8 px-5 h-full items-center justify-center  lg:justify-start">

          <!--div de la photo de profile sm:w-24 sm:h-24 lg:w-32 lg:h-32-->

          <div
          class="m-5 mx-auto lg:object-left w-40 h-40 lg:w-40 lg:h-40 image-fit intro-x col-span-8 lg:col-span-4">
          <img
          alt=""
          class="rounded-full dark:text-white "
          :src="user.photo"
          />
          <!--icono para el cambio de foto-->
          <div>
            <profile-photo :loadingState="photoLoadingState" @photoUpdated="updateProfilePhoto"></profile-photo>
          </div> <!--div que abre en linea 40-->
        </div> <!--div que abre en linea 31-->

        <!--div del nombre del profile-->

        <div class=" m-5 col-span-8 lg:col-span-4 md:col-span-8 grid ">
          <div
          class=" mx-auto md:whitespace-normal font-bold text-2xl text-center break-words">
          {{ user.first_name }} {{ user.last_name }}
        </div>
        <div class=" mx-auto text-slate-500 pb-4 ">{{ user.position }}</div>
        <div>
          <!--Le quite <button-->
          <a href="javascript:void(0)"
          id="link-with-google"
          class=" btn btn-outline-secondary py px w-full xl:mt-0 align-top " @click="linkGoogle()">
          <img
          alt=""
          class="mr-3 pl-1 h-5 w-6 "
          src="https://storage.googleapis.com/cmatik-dev-alternate-site/google.png"
          />
          Linkear con Google
        </a>
      </div>
    </div>
  </div>
</div>

<div class=" col-span-8 lg:col-span-4 md:col-span-4 p-5 md:border-l"> <!--capa detalle del contacto-->
  <user-card :user="user"></user-card>
</div>
<!--aqui comienza el otro div de la contraseñas-->

<div class="col-span-8 md:col-span-4 lg:col-span-4 p-5" v-if="providerIsFirebase">
  <password-form
  :user="user"
  :loadingState="passwordLoadingState"
  :errorMessage="passwordErrorMessage"
  @submittedPassword="sendPasswordForm"
  >
</password-form>
</div>
<!-- aqui esta el otro div-->

<div class="col-span-8  md:col-span-4 lg:col-span-4 p-5 border-l">
  <data-form
  :user="user"
  :loadingState="dataLoadingState"
  :errorMessage="dataErrorMessage"
  @submittedProfileForm="sendProfileForm"
  >
</data-form>
</div>

</div>

<!--toastify de notification de perfil modificado-->
<div
id="success-profile-update-notification-content"
class="toastify-content hidden flex">
<CheckCircleIcon class="text-success text-2xl"/>
<div class="ml-4 mr-4">
  <div class="font-medium">Perfil modificado!</div>
  <div class="text-gray-600 mt-1">
  </div>
</div>
</div>

<div
id="success-password-update-notification-content"
class="toastify-content hidden flex">
<CheckCircleIcon class="text-success text-2xl"/>
<div class="ml-4 mr-4">
  <div class="font-medium">Contraseña modificada!</div>
  <div class="text-gray-600 mt-1">
  </div>
</div>
</div>

<div
id="success-photo-update-notification-content"
class="toastify-content hidden flex">
<CheckCircleIcon class="text-success text-2xl"/>
<div class="ml-4 mr-4">
  <div class="font-medium">Foto modificada!</div>
  <div class="text-gray-600 mt-1">
  </div>
</div>
</div>

</div>
</template>


<script setup>

import {computed, ref, toRefs, reactive} from "vue";


import PasswordForm from "@/views/user/components/PasswordForm.vue"
import DataForm from "@/views/user/components/DataForm.vue"
import UserCard from "@/views/user/components/UserCard.vue"
import DarkModeSwitcher from "@/views/user/components/DarkModeSwitcher.vue"
import ProfilePhoto from "@/views/user/components/ProfilePhoto.vue"
import {auth} from "@/firebase/config"
import dom from "@left4code/tw-starter/dist/js/dom";
import {useUserStore} from "@/stores/user";
import {useAuthStore} from "@/stores/auth";
import Toastify from "toastify-js";
import {GoogleAuthProvider, linkWithPopup, OAuthProvider} from "firebase/auth";

const user = ref([])
const userStore = useUserStore()

const passwordLoadingState = ref(false)
const passwordErrorMessage = ref('')

const photoLoadingState = ref(false)

const dataLoadingState = ref(false)
const dataErrorMessage = ref('')

userStore.resolveUser()
user.value = userStore.userData

const changeUserDarkMode = (darkMode) => {
  userStore.darkModeProfile(user.value.uid, {dark_mode: !darkMode})
  .then(() => {
  }).catch(err => {
    console.log(err)
  })
}

const providerIsFirebase = computed(() => user.value.providerId === 'firebase' || !user.value.providerId)

const linkGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await linkWithPopup(auth.currentUser, provider).then((result) => {
    // The signed-in user info.
    const user = result.user;
    // This gives you a Google Access Token.
    const credential = provider.credentialFromResult(auth, result);
    const token = credential.accessToken;
  }).catch((err) => {
    switch (err.code) {
      case 'auth/popup-closed-by-user':
      break
      case 'auth/credential-already-in-use':
      console.log( 'Email ya fue utilizado');
      break
      default:
      console.log(err)
      break
    }
  });
};

const photoUpdateSuccessMessage = () => {
  Toastify({
    node: dom('#success-photo-update-notification-content')
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
const updateProfilePhoto = (event) => {
  photoLoadingState.value = true
  userStore.updateProfilePhoto(user.value.uid, {photo: event.srcElement.dropzone.files[0].dataURL})
  .then(() => {
    photoLoadingState.value = false
    photoUpdateSuccessMessage()
    location.reload()
  }).catch(err => {
    console.log(err)
  })
}

const profileUpdateSuccessMessage = () => {
  Toastify({
    node: dom('#success-profile-update-notification-content')
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
const sendProfileForm = async (data) => {
  await profileDataUpdate(data).then(response => {
    profileUpdateSuccessMessage()
    location.reload() // para hacer refresh
  }).catch(err => {
    switch (err) {
      case 'auth/invalid-phone-number':
      dataErrorMessage.value = 'Complete el formulario'
      break
      default:
      dataErrorMessage.value = err
      break
    }
  })
}
const profileDataUpdate = (data) => {
  return new Promise(async (resolve, reject) => {
    userStore.updateProfileData({
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      address: data.address,
      uid: user.value.uid
    }).then(() => {
      resolve(true)
    }).catch(err => {
      reject(err)
    })
  })
}

const passwordUpdateSuccessMessage = () => {
  Toastify({
    node: dom('#success-password-update-notification-content')
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
const sendPasswordForm = async (data) => {
  await updatePassword(data).then(response => {
    passwordUpdateSuccessMessage()
    passwordErrorMessage.value = ''
    location.reload() // para hacer refresh
  }).catch(err => {
    passwordLoadingState.value = false
    switch (err.code) {
      case 'auth/invalid-password':
      passwordErrorMessage.value = 'La contraseña tiene un error'
      break
      case 'auth/too-many-requests':
      passwordErrorMessage.value = 'Demasiados intentos erróneos, intente nuevamente mas tarde.'
      break
      case 'auth/wrong-password':
      passwordErrorMessage.value = 'La contraseña indicada no corresponde con la actual'
      break
      default:
      passwordErrorMessage.value = err
      break
    }
  })
}
const updatePassword = (data) => {
  return new Promise((resolve, reject) => {
    const auth = useAuthStore()
    auth.updatePassword({
      email: data.email,
      old_password: data.old_password,
      new_password: data.new_password,
    }).then((response) => {
      resolve(true)
    }).catch(err => {
      reject(err)
    })
  })
}

</script>
