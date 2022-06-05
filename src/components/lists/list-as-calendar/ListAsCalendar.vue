<template>
  <span v-for="(item, index) in items">

      <item-from-calendar :item="item" :index="index" @itemClicked="sendCallbackData"></item-from-calendar>
  </span>
</template>
<script setup>
  import ItemFromCalendar from "@/components/lists/list-as-calendar/ItemFromCalendar.vue"
  import {defineEmits} from "vue"

  const emit = defineEmits(['itemLinkClicked'])

  const sendCallbackData = (value) => {
    emit('itemLinkClicked', value)
  }

  const props = defineProps({
    items : {
      required : true,
      type: Array
    }
  })

</script>