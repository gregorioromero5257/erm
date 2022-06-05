<template>
    <button
        href="javascript:void(0)"
        @click.prevent="buttonClicked"  :id="btnId"
    >
      <span v-if="notLoading" class="px-1 flex" >
          <slot> </slot>
          <span>{{ caption }}</span>
      </span>

      <LoadingIcon icon="oval" color="gray" class="w-4 h-4 ml-2" v-else/>
    </button>
</template>
<script setup>

import {ref, toRefs} from "vue";

const notLoading = ref(true)
const props = defineProps({
  caption : {
    type: String
  },
  btnId : {
    type : String
  },
  callbackFunction : {
    type : Function
  },

})

const buttonClicked = () => {
  notLoading.value=false
  const button = document.querySelector('#'+props.btnId)
  button.disabled = true
  props.callbackFunction()
}

const finishLoading = () => {
  const button = document.querySelector('#'+props.btnId)
  button.disabled = false
  notLoading.value = true
}

defineExpose({
  finishLoading
})

</script>