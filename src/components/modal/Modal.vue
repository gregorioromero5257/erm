<template>
  <div
      :id="getId"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog" :class="[sizeClass]">
      <div class="modal-content">
        <modal-header :title="getTitle"></modal-header>
        <div class="modal-body p-10 text-center">
          <slot></slot>
        </div>
        <modal-footer>
          <slot name="footer-buttons"></slot>
        </modal-footer>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, defineProps} from "vue"
import ModalFooter from '@/components/modal/ModalFooter.vue'
import ModalHeader from '@/components/modal/ModalHeader.vue'
import dom from "@left4code/tw-starter/dist/js/dom";

const props = defineProps({
  id: {
    type: String
  },
  size: {
    type: String
  },
  title: {
    type: String
  },
  cancelText: {
    type: String
  }
})

//computed
const sizeClass = computed(() => {
  return props.size || ''
})
const getId = computed(() => {
  return props.id || 'remoteModal'
})
const getTitle = computed(() => {
  return props.title || ''
})
const getCancelText = computed(() => {
  return props.cancelText || 'Cancelar'
})

//methods
const hideModal = () => {
  dom('#'+getId.value).modal('hide')
}

</script>
