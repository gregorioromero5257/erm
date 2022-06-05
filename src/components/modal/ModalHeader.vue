<template>
  <div class="modal-header bg-theme-1 text-white">
    <h2 class="font-medium text-base mr-auto">
      <component
          :is="getIcon"
          class="mr-4 font-bold h-6 w-6" ></component>
      <span v-html="getTitle"></span>
    </h2>
    <button class="" data-dismiss="modal">
      <XIcon class="w-4 h-4" />
    </button>
  </div>
</template>
<script setup>
import {computed} from "vue";

const props = defineProps({
  title: {
    type: String
  },
  icon: {
    type: String
  }
})

// computed

const getTitle = computed(() => {
  return props.title || ''
})

const getIcon = computed(() => {
  return props.icon || 'layers-icon'
})

</script>
