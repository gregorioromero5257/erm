<template>
  <label :for="props.fieldId" class=" mt-5 form-label font-medium text-center lg:text-left lg:mt-3">
    {{ props.label }}
  </label>
  <input
      class="intro-x login__input form-control py-3 px-4 block"
      :type="props.fieldType"
      :placeholder="props.placeholder"
      v-model.trim="props.validateField"
      :class="{ 'border-theme-24': props.validateFieldError }"
  />
  <validation-message
      v-if="props.validateFieldError"
      :validateFieldError="props.validateFieldError">
  </validation-message>

</template>

<script setup>
import ValidationMessage from "@/components/form/validated-input/ValidationMessage.vue"
const props = defineProps({
  label : {
    type: String
  },
  fieldId: {
    type : String
  },
  callbackFunction : {
    type : Function
  },
  placeholder : {
    type : String
  },
  validateField : {
    required : true
  },
  validateFieldError : {
  },
  fieldType : {
    type : String,
    required : true
  }
})

</script>