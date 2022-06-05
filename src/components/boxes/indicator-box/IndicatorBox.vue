<template>
  <div class="box p-5 zoom-in">
    <div class="flex items-center">
      <div class="w-2/4 flex-none">
        <div class="text-lg font-medium truncate">{{title}}</div>
        <div class="text-slate-500 mt-1">{{sub_title}}</div>
        <span class="text-slate-500 mt-1">Reportes</span>
      </div>
      <div class="flex-none ml-auto relative ">
        <SimpleDonut :width="90" :height="90" :dataChart="chart_data"  />
        <div class="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import SimpleDonut from "@/components/charts/donut/SimpleDonut.vue";

const props = defineProps({
  title : {
    required: true,
    type : String,
  },
  sub_title: {
    required: true,
    type : String
  },
  donut_size : {
    type : Number,
    default : 90
  },
  chart_data: {
    required: true,
    type: Array,

  }
})

</script>