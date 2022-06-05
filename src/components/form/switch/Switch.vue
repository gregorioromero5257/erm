<template>
  <div class="">
    <div class="form-check">
      <input
          :id="name"
          class="form-check-switch"
          type="checkbox"
          :checked="isChecked"
          @click="shareData"
          v-model="switchValue"
      />
      <label class="form-check-label" :for="name" v-if="getLabel">
        <span v-html="getLabel"></span>
      </label>
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from "vue"

const props = defineProps({
  label: {
    type: String
  },
  name: {
    type: String
  },
  value: {
    type: String
  },
  checked: {
    type: Boolean
  },
  switchCallback: {
    type: Function
  }
})
//data
const switchValue = ref(props.checked);

// computed
const getLabel = computed(() => {
  return props.label || false
})
const isChecked = computed(() => {
  return props.checked || false
})
const getName = computed(() => {
  return props.name || ''
})
// methods

const shareData = () => {
  props.switchCallback({
    name : getName.value,
    value : !switchValue.value
  })
}

</script>