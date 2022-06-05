<template>
  <div class="col-span-4 md:col-span-4 xl:col-span-4">
      <list-with-indicator :items="state.reportables" title="Puntos de control">
      </list-with-indicator>
  </div>
</template>

<script setup>
import {cprAxios} from "@/endpoint/endpointResolver";
import { reactive, toRefs, onMounted, watch, computed } from 'vue'
import ListWithIndicator  from '@/components/lists/list-with-indicator/ListWithIndicator.vue'

// star -- busqueda para el filtro del calendario
const props = defineProps({
  dates : {
    required : true,
    type : String
  }
  })

const startDate = computed(()=>{
  return props.dates.split(' ')[0]
})
// la pocision [1] es el guion
const endDate = computed(() => {
  return props.dates.split(' ')[2]
})

console.log(startDate)
console.log(endDate)

// para poder aplicar el watch se debe hacer por func. computed
const dateComputed = computed(()=>{
  return props.dates
})

watch(dateComputed, ()=>{
  getReportables()
})
// end -- busqueda para el filtro del calendario

const state = reactive({
    reportables : [],
})

const getReportables = async ()=> {
  await cprAxios.post('reportables-list', {
    type : "DGA",
    start_date :  startDate.value + " 00:00:00",
    end_date : endDate.value + " 23:59:59"
  }).then(res => {
    state.reportables = res.data
  }).catch(err => console.log(err))
}
toRefs(state)
getReportables()


</script>