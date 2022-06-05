<template>

  <div class=" w-12 h-12 mx-auto mt-36" v-if="loading_state" >
    <LoadingIcon icon="bars" class="w-8 h-8" />
  </div>

  <div class="intro-y box " v-else>

    <div class=" flex flex-col sm:flex-row items-center pb-5 border-b border-slate-200/60 flex justify-between" >
      <div>
        <span class=" font-medium text-base mt-5 ml-4" >{{ title}}:  {{ current_day}}</span>
        <span class=" badge bg-cyan-500 text-white rounded p-2 mt-5 ml-4">{{ total_items }} Reportes</span>
      </div>
      <div class="form-check form-switch">
        <label class="form-check-label ml-0" v-if="!showColums" for="show">Ver más</label>
        <label class="form-check-label ml-0" v-else for="show">Ver menos</label>
        <input
            id="show"
            class="show-code form-check-input mr-0 ml-3"
            type="checkbox"
            v-model="showColums"
        />
      </div>
    </div>
    <div class="  overflow-auto h-full">
        <div class="h-[650px] flex-grow overflow-x-auto">
          <table class="table table-sm table-striped relative">
            <thead :class="[{'text-center': !showColums}]">
            <tr class="sticky top-0 bg-white dark:bg-darkmode-800 ">
              <th class="whitespace-nowrap ">Indicador</th>
              <th class="whitespace-nowrap ">Fecha de reporte</th>
              <th class="whitespace-nowrap " v-if="showColums">Creado en</th>
              <th class="whitespace-nowrap " v-if="showColums">Reportado en</th>
              <th class="whitespace-nowrap " v-if="showColums">Completado en</th>
              <th class="whitespace-nowrap " v-if="showColums">Código</th>
              <th class="whitespace-nowrap " v-if="showColums">Respuesta</th>
              <th class="whitespace-nowrap " v-if="showColums">Código de verificación</th>
              <th class="whitespace-nowrap " v-if="showColums">Mensaje de verificación</th>
              <th class="whitespace-nowrap " v-if="showColums">Uuid</th>
              <th class="whitespace-nowrap " v-for="sensor in state.reports[0].sensors">{{sensor.name}}</th>
            </tr>
            </thead>
            <tbody class="" :class="[{'text-center': !showColums}]">
            <tr v-for="(report, index, key) in state.reports" >

              <td class="whitespace-nowrap" >
                <Tippy  tag="a" href="javascript:;" class="tooltip " :content="report.sync_text" :options="{
                        theme: 'light',
                        zIndex : 99999
                      }">
                  <span class=" transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:text-primary
                duration-300 hover:font-bold" >
                    <div
                      class="mx-auto w-5 h-5  rounded-full "
                      :class="indicatorColorCalculation(report.indicator)"
                  >
                  </div>
                </span>
                </Tippy>

              </td>
              <td class="whitespace-nowrap">{{extractDate(replaceBlank(report.report_date))}} </td>
              <td class="whitespace-nowrap" v-if="showColums">{{replaceBlank(report.created_at)}}</td>
              <td class="whitespace-nowrap" v-if="showColums">{{replaceBlank(report.reported_at)}}</td>
              <td class="whitespace-nowrap" v-if="showColums">{{replaceBlank(report.completed_at)}}</td>
              <td class="whitespace-nowrap" v-if="showColums">{{replaceBlank(report.response_code)}}</td>
              <td class="whitespace-nowrap" v-if="showColums">{{replaceBlank(report.response_message)}}</td>
              <td class="whitespace-nowrap" v-if="showColums">{{replaceBlank(report.verification_code)}}</td>
              <td class="whitespace-nowrap" v-if="showColums">{{replaceBlank(report.verification_message)}}</td>
              <td class="whitespace-nowrap" v-if="showColums">{{replaceBlank(report.uuid)}}</td>
              <td class="whitespace-nowrap" v-for="sensor in report.sensors"> {{ replaceBlank(sensor.reported_value) }} </td>
            </tr>
            </tbody>
          </table>
        </div>
    </div>
  </div>
</template>

<script setup>

import {reactive, ref, toRefs, watch, computed} from "vue";
import {cprAxios} from "@/endpoint/endpointResolver";
import indicatorColorCalculation from "@/utils/indicator-color-calculation";

const showColums = ref(false)

const props = defineProps({
  reportable_id : {
    required : true,
    type: Number
  },
  current_day : {
    required : true,
    type: String
  },
  title : {
    required: true,
    type : String
  },
})
const loading_state = ref(false)
const currentDayWatcher = computed(() => {
  return props.current_day
})
watch(currentDayWatcher,(cd) => {
  getReportableDailyStatusDetail(cd)
})

const state = reactive({
  reports : [],
})

const getReportableDailyStatusDetail = (cd)=> {
  loading_state.value = true
  cprAxios.post('reportable-daily-status-detail', {
    reportable_id: props.reportable_id ,
    date: cd,
  }).then(res => {
    state.reports = res.data.reports
    loading_state.value=false
  }).catch(err => console.log(err))
}
getReportableDailyStatusDetail(props.current_day)
toRefs(state)

const total_items = computed (()=>{
    return state.reports.length
})

const extractDate = (date)=>{
  return date.substring(16 - 5)
}

// funcion para poner el ( - ) en la celda vacia
const replaceBlank = (value) =>
{
  console.log(value)
  if(value === '' || value === null) {
    return "-"
  }
  return value
}
</script>