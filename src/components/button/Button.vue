<template>
  <button class="btn btn-primary py-3 px-4 w-full md:w-full lg:w-full align-top">
    <component v-if="icon"
               :is="icon"
               class="mr-2" ></component>
    <span v-html="caption"></span>
  </button>
</template>
<script setup>
import {ref} from "vue";

const props = defineProps({
  icon : {
    type : String
  },
  caption : {
    type : String
  }
})
</script>
