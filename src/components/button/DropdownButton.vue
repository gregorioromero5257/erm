<template>
  <div class="dropdown inline-block" data-tw-placement="bottom" v-if="checkButtonsLength()">
    <button class="dropdown-toggle btn btn-secondary w-auto mr-1 mb-2" aria-expanded="false" data-tw-toggle="dropdown">
      <MoreVerticalIcon class="h-4 w-4" />
    </button>
    <div class="dropdown-menu w-40">
      <ul class="dropdown-content">
        <li v-for="(button,index) in props.buttons">
          <a  href="button.url || 'javascript:void(0)'" class="dropdown-item">
            <component :is="button.icon" class="w-4 h-4" ></component> {{ button.caption}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";
const props = defineProps({
  mainButton: {
    type: String
  },
  buttons:{
    type: Array
  }
})

const mainButtonClasses = computed(() => {
  return `${props.mainButton}` || "btn-primary"
})
const checkButtonsLength= () => {
  return props.buttons.length > 0
}
const openModal = (modal) => {
  dom('#'+modal).modal('show')
}
const handleClickEvent = (button) =>{
    if(button.remote !== false) {
      openModal(button.remote.modal_id)
    }
  }

</script>