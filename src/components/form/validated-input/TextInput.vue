<template>
  <validated-input
    fieldType="text"
    :fieldId="props.fieldId"
    :placeholder="props.placeholder"
    :label="props.label"
    :validateField="props.validatedField"
    :validateFieldError="props.validateFieldError"
  ></validated-input>
</template>

<script setup>
import ValidatedInput from "@/components/form/validated-input/ValidatedInput.vue"

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
  }
})

</script>