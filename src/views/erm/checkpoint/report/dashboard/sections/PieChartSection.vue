<template>


  <div class=" h-full w-full lg:col-span-6 col-span-12  ">

    <pie-chart
    :label_s="chartLabels"
    :date="state.pieChart.data"
    ></pie-chart>
  </div>

  <div class="h-full w-full lg:col-span-6 col-span-12  ">
    <indicator-pie-chart
        :items="state.pieChart.retried_data"

    ></indicator-pie-chart>
</div>
</template>
<script setup>
import PieChart from "@/components/charts/pie/PieChart.vue"
import IndicatorPieChart from "@/components/boxes/indicator-box/IndicatorPieChart.vue"
import {reactive, toRefs, computed, watch} from "vue";
import {cprAxios} from "@/endpoint/endpointResolver";


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

const pieChartComputed = computed(()=>{
  return props.dates
})
watch(pieChartComputed, ()=>{
  getReportablesPieChart()
})




const chartLabels = ['Completados','Reenviados', 'Rehechos']
const state = reactive({
  pieChart : [{
    data: [],

  }
  ],
})

const getReportablesPieChart = ()=> {
  // loading_state.value = true
  cprAxios.post('reportables-pie-chart', {
    type : "DGA",
    start_date: startDate.value + " 00:00:00",
    end_date: endDate.value + " 00:00:00"
  }).then(res => {
    state.pieChart = res.data
    state.pieChart["data"] = [
      res.data.ok_count,
      res.data.retried_count,
      res.data.remake_count
    ]

    // loading_state.value=false
  }).catch(err => console.log(err))
}
getReportablesPieChart()
toRefs(state)

</script>