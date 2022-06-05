<template>

  <div class="w-12 h-12 mx-auto mt-36" v-if="loading_state" >
    <LoadingIcon icon="bars" class="w-8 h-8" />
  </div>

  <div class="intro-y box pb-5" v-else>

    <div class=" pt-5 flex flex-col sm:flex-row items-center pb-5 border-b border-slate-200/60" >
      <div>
        <span class=" font-medium text-base mt-5 ml-4">{{ title}}</span>
      </div>
      <div class="w-full flex justify-between">
          <!-- filter-->
        <div class="flex justify-between">
          <div>
            <div class=" absolute rounded-l-md w-10 h-10 flex items-center justify-center bg-slate-100
                border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
              <SearchIcon class="w-4 h-4" />
            </div>
            <input
                type="search"
                placeholder="Filtrar listado"
                v-model="query"
                class="form-control  pl-12 h-10"
            />
          </div>
          <span class=" ml-5 bg-slate-400 flex items-center justify-center  text-base text-white rounded px-2 ">{{ total_items }}</span>
        </div>
        <!-- filter-->
        <div class="mr-4 form-check form-switch">
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
    </div>
    <div class="overflow-x-auto overflow-y-auto max-h-[430px]">
      <table class="table table-sm table-striped relative" v-if=" state.reports">
        <thead>
        <tr class="sticky top-0 bg-white dark:bg-darkmode-800">
          <template v-for="(value, key, index) in state.reports[0]">
            <th class="whitespace-nowrap"
                v-if="hideColumns(index)">{{ key }}
            </th>
          </template>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(report, index) in filteredItems">
          <template v-for="(item, key, index) in state.reports[0]">
            <td class="whitespace-nowrap"
                v-if="hideColumns(index)"
            >{{ replaceBlank(report[key]) }}</td>
          </template>
        </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

import {reactive, ref, toRefs, watch, computed} from "vue";
import {cprAxios} from "@/endpoint/endpointResolver";
import indicatorColorCalculation from "@/utils/indicator-color-calculation";
import moment from 'moment'


const props = defineProps({
  dates : {
    required : true,
    type : String
  }
})

const showColums = ref(false)

const query = ref ('')
const filtered_items  = ref(null)
const loading_state = ref(false)

const state = reactive({
  reports : [],
})

const replaceBlank = (value) => {
  if(value === '' || !value) {
    return "0"
  }
  return value
}

const diffComputed = computed(()=>{
  return moment(endDate.value, "YYYY-MM-DD").diff(moment(startDate.value, "YYYY-MM-DD"), 'day') + 3
})


const hideColumns = (index )=>{
  return (showColums.value || index === 0 || index === 1 || index === diffComputed.value)
}


const total_items = computed (()=>{
  if (filtered_items.value === null || filtered_items.value === state.reports.length) {
    return state.reports.length
  } else {
    return filtered_items.value + ' / ' + state.reports.length
  }
})

const filteredItems = computed(()=>{
  let filtered = state.reports.filter(item => {
        return item["Código de obra"].toLowerCase().includes(query.value.toLowerCase()) ||
            item["Nombre"].toLowerCase().includes((query.value.toLowerCase()))
      }
  )
  filtered_items.value = filtered.length
  return filtered
})

const startDate = computed(()=>{
  return props.dates.split(' ')[0]
})

const endDate = computed(() => {
  return props.dates.split(' ')[2]
})

const dateWatcherComputed = computed(()=>{
  return props.dates
})

watch(dateWatcherComputed, ()=>{
  getReportableTable()
})

const getReportableTable = ()=> {
  loading_state.value = true
  cprAxios.post('reportables-table', {
    type : "DGA",
    start_date: startDate.value + ' 00:00:00',
    end_date: endDate.value + ' 23:59:59'
  }).then(res => {
    state.reports = res.data


    loading_state.value=false
  }).catch(err => console.log(err))
}
getReportableTable()
toRefs(state)



</script>