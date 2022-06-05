<template>
  <h5 class="font-medium text-lg border-b flex mb-4">
    <UserIcon class="w-5 h-5 mr-2"/>
    Cambio de datos personales
  </h5>
  <!--alerta de error de datos-->
  <div class="alert alert-danger-soft flex items-center mb-2" v-if="checkErrorMessage">
    <AlertOctagonIcon class="w-6 h-6 mr-2"/>
    {{ getErrorMessage }}
  </div>
  <!-- first_name -->
  <div>
    <label for="first_name" class=" mt-5 form-label font-medium text-center lg:text-left lg:mt-3">
      Modificar Nombres
    </label>
    <input
        type="text"
        name="first_name"
        id="first_name"
        class="intro-x login__input form-control py-3 px-4 block"
        placeholder="Apellidos"
        v-model.trim="validate.first_name.$model"
        :class="{ 'border-theme-24': validate.first_name.$error }"
    />
    <template v-if="validate.first_name.$error">
      <div
          v-for="(error, index) in validate.first_name.$errors"
          :key="index"
          class="text-danger mt-2"
      >
        {{ error.$message }}
      </div>
    </template>
  </div>
  <!-- last_name -->
  <div>
    <label for="last_name" class=" mt-5 form-label font-medium text-center lg:text-left lg:mt-3">
      Modificar Apellidos
    </label>
    <input
        type="text"
        name="last_name"
        id="last_name"
        class="intro-x login__input form-control py-3 px-4 block"
        placeholder="Apellidos"
        v-model.trim="validate.last_name.$model"
        :class="{ 'border-theme-24': validate.last_name.$error }"
    />
    <template v-if="validate.last_name.$error">
      <div
          v-for="(error, index) in validate.last_name.$errors"
          :key="index"
          class="text-danger mt-2"
      >
        {{ error.$message }}
      </div>
    </template>
  </div>
  <!-- phone -->
  <div>
    <label for="phone" class=" mt-5 form-label font-medium text-center lg:text-left lg:mt-3 ">
      Modificar Télefono de Contacto
    </label>
    <input
        type="text"
        name="phone"
        id="phone"
        class="intro-x login__input form-control py-3 px-4 block"
        placeholder="Phone"
        v-model.trim="validate.phone.$model"
        :class="{ 'border-theme-24': validate.phone.$error }"
    />
    <template v-if="validate.phone.$error">
      <div
          v-for="(error, index) in validate.phone.$errors"
          :key="index"
          class="text-danger mt-2"
      >
        {{ error.$message }}
      </div>
    </template>
  </div>
  <!-- address -->
  <div>
    <label for="address" class=" mt-5 form-label font-medium text-center lg:text-left lg:mt-3 ">
      Modificar Dirección
    </label>
    <input
        type="text"
        name="address"
        id="address"
        class="intro-x login__input form-control py-3 px-4 block"
        placeholder="Dirección"
        v-model.trim="validate.address.$model"
        :class="{ 'border-theme-24': validate.address.$error }"
    />
    <template v-if="validate.address.$error">
      <div
          v-for="(error, index) in validate.address.$errors"
          :key="index"
          class="text-danger mt-2"
      >
        {{ error.$message }}
      </div>
    </template>
  </div>
  <!-- loading button -->
  <div>
    <loading-button
        class=" mt-5 btn btn-primary py px w-full mt- xl:mt-5 align-top  lg:mt-5"
        :callbackFunction="clickedSendData"
        btnId="btn-profile"
        ref="sendDataBtn"
        caption="Guardar Datos" >
      <!-- ref hacerlo visible en la vista actual, se debe de crear la funcion abajo -->
    </loading-button>

  </div>
</template>
<script setup>
  import {ref, computed, reactive, toRefs, defineEmits, watch} from "vue";
  import LoadingButton from "@/components/button/LoadingButton.vue"
  import useVuelidate from '@vuelidate/core'
  import {
    required,
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

  const emit = defineEmits(['submittedProfileForm'])

  const localErrorMessage = ref("")

  const sendDataBtn = ref()
  const button = document.querySelector('#btn-profile')
  const loadingStateChecker = ref(props.loadingState)

  watch(loadingStateChecker, (loadingStateValue) => {
    button.disable = loadingStateValue
  })

  const profileFormData = reactive({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    phone: props.user.phone,
    address: props.user.address
  });

  const rulesForProfileForm = {
    first_name: {
      required
    },
    last_name: {
      required
    },
    phone: {
      required
    },
    address: {
      required
    },
  }

  const validate = useVuelidate(rulesForProfileForm, toRefs(profileFormData));

  const clickedSendData = () => {
    validate.value.$touch();
    if (validate.value.$invalid) {
      localErrorMessage.value = "Error de validación"
    } else {
      emit('submittedProfileForm', profileFormData)
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