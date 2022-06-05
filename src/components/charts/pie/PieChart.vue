<template>
  <div class="intro-y h-full box p-5" >

    <simple-pie-chart class="mt-5 h-96 w-96" :labels="label_s" :data="date" />

  </div>
</template>
<script setup>
import SimplePieChart from "@/components/charts/donut/SimplePieChart.vue";

const props = defineProps({
  label_s : {
    required : true,
    type: Array,
},
  date: {
    required : true,
    type: Array,
  }
})

</script>

<!--chartLabels    state.pieChart.data-->