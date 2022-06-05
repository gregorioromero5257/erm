<template>
  <div
      v-for="(error, index) in props.validateFieldError"
      :key="index"
      class="text-danger mt-2"
  >
    {{ error.$message }}
  </div>
</template>

<script setup>

const props = defineProps({
  validateFieldError : {
    required : true
  }
})

</script>