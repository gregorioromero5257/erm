<template>
  <div class="intro-y flex items-center justify-between mt-8 mb-4">
    <h2 class="text-lg font-medium mr-auto flex">
      <component v-if="getIcon"
                 :is="getIcon"
                 class="mr-4 font-bold h-8 w-8" ></component>
      <span v-html="getTitle"></span>
    </h2>
    <slot></slot>
  </div>
</template>

<script setup>
 import {computed} from "vue"

const props = defineProps({
  title: {
    type: String
  },
  icon : {
    type : String
  }
})

const getTitle = computed(() => {
  return props.title || 'Home';
})

const getIcon = computed(() => {
  return props.icon || '';
})
 // layers-icon
</script>