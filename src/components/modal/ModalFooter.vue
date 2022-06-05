<template>
  <div class="modal-footer text-right">
    <slot>

    </slot>
    <button type="button" data-dismiss="modal" class="btn btn-secondary w-20 mr-1">
      <span v-html="getCancelText"></span>
    </button>
  </div>
</template>
<script setup>
import {computed} from 'vue'

const props = defineProps({
  cancelText: {
    type: String
  }
})

  //computed
const getCancelText = computed(() => {
  return props.cancelText || 'Cancelar'
})

</script>