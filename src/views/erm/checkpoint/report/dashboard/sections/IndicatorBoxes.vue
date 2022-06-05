<template>


  <div class=" col-span-12 intro-y flex items-center ">
    <h2 class="mb-5 text-lg font-medium truncate ">Reportes</h2>
  </div>

  <div class=" col-span-12  lg:col-span-4 intro-y -mt-2" v-for="box in state.boxes">

    <indicator-box
        :title="box.title"
        :sub_title="box.sub_title"
        :chart_data="box.chartData"
    >
      {{ box.percentage }} %
    </indicator-box>
  </div>
</template>
<script setup>
import IndicatorBox from "@/components/boxes/indicator-box/IndicatorBox.vue"
import {onMounted,ref, reactive, toRefs, computed, watch} from "vue";
import {cprAxios} from "@/endpoint/endpointResolver";


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
// para poder aplicar el watch se debe hacer por func. computed
const dateComputedBoxes = computed(()=>{
  return props.dates
})

watch(dateComputedBoxes, ()=>{
  getReportablesIndicator()
})
// end -- busqueda para el filtro del calendario


const state = reactive({
  boxes : [{
    title : "Total",
    sub_title : "",
    percentage : 0,
    chartData:[]
  },
  {
    title: "Enviados",
    sub_title : "",
    percentage : 0,
    chartData:[]
  },
  {
    title:"Erróneos",
    sub_title : "",
    percentage : 0,
    chartData:[]
  }],
})

const okTotal=(data)=>{
  return (data.ok_percentage + data.failed_percentage).toFixed(2)
}

const loading_state = ref(false)

const getReportablesIndicator = ()=> {
  loading_state.value = true
  cprAxios.post('reportables-indicator', {
    type : "DGA",
    start_date: startDate.value + " 00:00:00",
    end_date: endDate.value + " 00:00:00"
  }).then(res => {
    state.boxes[0]["sub_title"] = res.data.total_count
    state.boxes[1]["sub_title"] = res.data.ok_count
    state.boxes[2]["sub_title"] = res.data.failed_count

    state.boxes[0]["percentage"] = okTotal(res.data)
    state.boxes[1]["percentage"] = res.data.ok_percentage
    state.boxes[2]["percentage"] = res.data.failed_percentage

    state.boxes[0]["chartData"] = [res.data.ok_count, res.data.failed_count]
    state.boxes[1]["chartData"] = [res.data.ok_count]
    state.boxes[2]["chartData"] = [res.data.failed_count]


    loading_state.value=false
  }).catch(err => console.log(err))
}
getReportablesIndicator()
toRefs(state)
</script>


