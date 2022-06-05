<template>
  <validated-input
      type="password"
      :fieldId="props.fieldId"
      :placeholder="props.placeholder"
      :label="props.label"
      :validatedField="props.validatedField"
  ></validated-input>
</template>

<script setup>
import ValidationMessage from "@/components/form/validated-input/ValidatedInput.vue"

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
  }
})
</script>