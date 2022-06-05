<template>
  <div class="box px-5 py-3 mb-3 flex items-center zoom-in" @click="redirectTo()">
    <div
        class="w-10 h-10 flex-none image-fit rounded-full  overflow-hidden"
        :class="indicatorColorCalculation(item.indicator)"
    >
    </div>
    <div class="ml-4 mr-auto">
      <div class="font-medium">
        {{ item.name }}
      </div>
      <div class="  text-slate-500 text-xs mt-0.5 ">
        {{ item.sub_name }}
      </div>
    </div>
    <div>
      {{ item.ok_count }} / {{ item.total_count }}
    </div>
  </div>
</template>
<script setup>
import {useRoute, useRouter} from "vue-router";
import indicatorColorCalculation from "@/utils/indicator-color-calculation";
const props = defineProps({
  item : {
    required : true
  },
  route_name : {
    required : true,
    type : String
  }
})

const route = useRoute()
const router = useRouter()

const redirectTo = () => {
  router.push({
    name:props.route_name,
    params:{
      id: props.item.id
    }
  })
}


</script>