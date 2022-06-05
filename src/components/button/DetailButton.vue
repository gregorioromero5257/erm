<template>
  <div class="text-center">
    <a href="javascript:" @click="largeSlideOverSizePreview = true" class="btn btn-primary mr-1 mb-2">Show Large Slide Over</a>
  </div>
  <Modal size="modal-lg" :slideOver="true" :show="largeSlideOverSizePreview" @hidden="largeSlideOverSizePreview = false">
    <ModalHeader class="p-5">
      <h2 class="font-medium text-base mr-auto">
        Large Slide Over
      </h2>
    </ModalHeader>
    <ModalBody>This is totally awesome large slide over!</ModalBody>
  </Modal>
</template>
<script setup>

import {ref} from "vue";

const largeSlideOverSizePreview = ref()


</script>