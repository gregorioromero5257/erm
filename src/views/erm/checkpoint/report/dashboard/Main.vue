<template>
  <div class="w-full h-full ">
  <!--  div inferior donde se encunetran los botones-->
    <div class="w-full h-auto ">
      <div class="mb-5">
        <content-header title="Vista de Dashboard" icon="PieChartIcon"></content-header>
      </div>
      <div class="grid grid-cols-12 gap-5 lg:gap-3 mb-5 ">
        <div class="lg:col-span-4 col-span-12 ">
          <TomSelect
                     v-model="select"
                     :options="{
                     placeholder: 'Selecciona una zona',
                     }"
                     class=""
          >
            <option value="1">Rancagua Norte</option>
            <option value="2">Rancagua Sur</option>
            <option value="3">Rancagua Poniente</option>
            <option value="4">Rancagua Oriente</option>
          </TomSelect>
        </div>

        <div class="col-span-12 lg:col-span-4">
            <div class=" absolute rounded-l-md w-10 h-10 flex items-center justify-center bg-slate-100
            border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
              <CalendarIcon class="w-4 h-4" />
            </div>
            <Litepicker v-model="dates"
                        :options="{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                  maxDate: maxDate,
                  format:'YYYY-MM-DD',

          }"
              class="form-control  pl-12 h-10" />
        </div>
        <div class=" col-span-4 lg:col-span-4 lg:justify-self-end">
          <button class="btn h-10 rounded-l-md bg-secondary flex text-green-600 border dark:bg-green-700 dark:border-darkmode-800 ">
            <DownloadIcon class="w-4 h-4 mr-3 " /> Excel
          </button>
        </div>
      </div>
    </div>

    <div class=" grid grid-cols-12 gap-5 h-auto ">
      <div class="col-span-12 lg:col-span-8 grid grid-cols-8 gap-5" id="left-side">
        <!--inditatorBoxes-->
        <div class=" h-auto w-auto col-span-8 grid grid-cols-12 gap-3">
          <indicator-boxes
              :dates="dates"
          >
          </indicator-boxes>
          <pie-chart-section
              :dates="dates"
          >

          </pie-chart-section>
        </div>
        <!--tabla de datos -->
        <div class=" w-full col-span-8 lg:gap-3  ">
          <data-table
              :dates="dates"
            >
          </data-table>
        </div>
      </div>

<!--  lateral derecho-->
      <div class=" h-full lg:col-span-4  col-span-12  " id="right-side">
        <div class=" xl:border-l -mb-10 pb-10 h-full">
          <div class=" xl:pl-5 grid grid-cols-4 h-full ">
            <!-- BEGIN: Transactions -->
            <checkpoint-reportable-list
                :dates="dates"
                >
            </checkpoint-reportable-list>
            <!-- END: Transactions -->
<!--            {{ $route.params.id }}-->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import {reactive, ref} from "vue";
import ContentHeader from "@/components/general/ContentHeader.vue";
import CheckpointReportableList from "@/views/erm/checkpoint/report/dashboard/sections/CheckpointReportableList.vue";
import IndicatorBoxes from "@/views/erm/checkpoint/report/dashboard/sections/IndicatorBoxes.vue"
import DataTable from "@/views/erm/checkpoint/report/dashboard/sections/DataTable.vue"
import moment from 'moment'
import PieChartSection from "@/views/erm/checkpoint/report/dashboard/sections/PieChartSection.vue"


const maxDate = ref(moment())
const dates = ref ( moment().startOf('month').format("YYYY-MM-DD") +  ' - ' +  moment().format("YYYY-MM-DD"))
console.log(moment().startOf('month').format("YYYY-MM-DD") +  ' - ' +  moment().format("YYYY-MM-DD"))

</script>