<template>
  <h5 class="font-medium text-lg border-b flex mb-4">
    <KeyIcon class="w-5 h-5 mr-2"/>
    Cambio de contraseña
  </h5>
  <!--div de alerta de error en password-->
  <div class="  alert alert-danger-soft flex items-center mb-2" v-if="checkErrorMessage">
    <AlertOctagonIcon class="w-6 h-6 mr-2"/>
    {{ getErrorMessage }}
  </div>
  <!-- begin password form-->
  <form>
    <!--- contraseña actual -->
    <div>
      <label for="old_password" class=" mt-5 form-label font-medium text-center lg:text-left lg:mt-3">
        Contraseña actual
      </label>
      <input
          type="password"
          name="old_password"
          id="old_password"
          class="intro-x login__input form-control py-3 px-4 block"
          placeholder="ingrese contraseña actual"
          autocomplete="on"
          pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
          v-model.trim="validatePasswordForm.old_password.$model"
          :class="{ 'border-theme-24': validatePasswordForm.old_password.$error }"

      />
      <template v-if="validatePasswordForm.old_password.$error">
        <div
            v-for="(error, index) in validatePasswordForm.old_password.$errors"
            :key="index"
            class="text-danger mt-2"
        >
          {{ error.$message }}
        </div>
      </template>
    </div>
    <!--- nueva actual -->
    <div>
      <label for="password" class=" mt-5 form-label font-medium text-center lg:text-left lg:mt-3">
        Nueva Contraseña
      </label>
      <input
          type="password"
          class="intro-x login__input form-control py-3 px-4 block"
          placeholder="Contraseña nueva"
          name="password"
          id="password"
          autocomplete="on"
          pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
          v-model.trim="validatePasswordForm.new_password.$model"
          :class="{ 'border-theme-24': validatePasswordForm.new_password.$error }"

      />
      <template v-if="validatePasswordForm.new_password.$error">
        <div
            v-for="(error, index) in validatePasswordForm.new_password.$errors"
            :key="index"
            class="text-danger mt-2"
        >
          {{ error.$message }}
        </div>
      </template>
    </div>
    <!--- contraseña nueva confirmación -->
    <div>
      <label for="password_confirmation" class=" mt-5 form-label font-medium text-center lg:text-left lg:mt-3"> Repetir
        Confirme nueva contraseña
      </label>
      <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          class="intro-x login__input form-control py-3 px-4 block"
          placeholder="Repetir Nueva Contraseña"
          pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
          autocomplete="on"
          v-model.trim="validatePasswordForm.password_confirmation.$model"
          :class="{ 'border-theme-24': validatePasswordForm.password_confirmation.$error }"

      />
      <template v-if="validatePasswordForm.password_confirmation.$error">
        <div
            v-for="(error, index) in validatePasswordForm.password_confirmation.$errors"
            :key="index"
            class="text-danger mt-2"
        >
          {{ error.$message }}
        </div>
      </template>
    </div>
    <!--- contraseña submit button -->
    <div>
      <loading-button
          class=" mt-5 btn btn-primary py px w-full mt- xl:mt-5 align-top lg:mt-5"
          :callbackFunction="clickedSubmitPassword"
          btnId="btn-password"
          ref="sendPasswordBtn"
          caption="Guardar Datos"
      >
        <!-- ref hacerlo visible en la vista actual, se debe de crear la funcion abajo -->
      </loading-button>
    </div>
  </form>
</template>
<script setup>
  import {ref, reactive, toRefs, defineEmits, watch, computed} from "vue";
  import LoadingButton from "@/components/button/LoadingButton.vue"
  import useVuelidate from '@vuelidate/core'
  import {
    required,
    maxLength,
    minLength
  } from '@vuelidate/validators'

  const props = defineProps({
    user: {
      required : true,
      type: Object
    },
    loadingState:{
      required : true,
      type: Boolean
    },
    errorMessage: {
      required:false,
      type : String
    }
  })
  const loadingStateChecker = ref(props.loadingState)
  const buttonPassword = document.querySelector('#btn-password')

  watch(loadingStateChecker, (loadingStateValue) => {
      console.log(loadingStateValue)
  })

  const emit = defineEmits(['submittedPassword'])

  const sendPasswordBtn = ref()

  const localErrorMessage = ref("")

  const passwordFormData = reactive({
    email: props.user.email,
    old_password: "",
    new_password: "",
    password_confirmation: ""
  });

  const rulesForPasswordForm = {
    old_password: {
      required,
    },
    new_password: {
      required,
      minLength,
      maxLength,
    },
    password_confirmation: {
      required,
    },

  }

  const validatePasswordForm = useVuelidate(rulesForPasswordForm, toRefs(passwordFormData));

  const clickedSubmitPassword = () => {
    validatePasswordForm.value.$touch();
    if (validatePasswordForm.value.$invalid) {
      localErrorMessage.value = 'Error de validación'
    } else {
      if (passwordFormData.new_password === passwordFormData.password_confirmation) {
        emit("submittedPassword", passwordFormData)
      } else {
        localErrorMessage.value = 'Las contraseñas no coinciden'
      }
    }

  }

  const getErrorMessage = computed(() => {
    if (props.errorMessage !== undefined && props.errorMessage !== '') {
      return props.errorMessage
    }
    return localErrorMessage.value
  })
  const checkErrorMessage = computed(() => {
    return getErrorMessage.value !== '';
  })
</script>