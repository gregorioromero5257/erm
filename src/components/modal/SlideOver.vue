<template>
  <div
      :id="id"
      class="modal modal-slide-over"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
<!--        modal-header p-5-->
        <div class="">
          <h2 class="font-medium text-base mr-auto">
            {{ title }}
          </h2>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props  = defineProps({
    title : {
      required: true,
      type : String
    },
    id : {
      required : true,
      type: String
    }
  })
</script>