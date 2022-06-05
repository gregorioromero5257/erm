<template>
  <div class="flex justify-between">
    <div>
      <content-header :title="page_title" icon="PieChartIcon"></content-header>
    </div>
    <a href="/dashboard" class="btn btn-secondary w-24  h-9 mt-8 mr-3">Volver</a>
  </div>

  <div class="w-12 h-12 mx-auto mt-36" v-if="loading_state" >
      <LoadingIcon icon="bars" class="w-8 h-8" />
  </div>
  <div class="w-full h-full" v-if="!loading_state">
      <!--  Meses-->
      <div >
        <list-as-carousel :items="mappedItems" :current_item="current_month" @currentItemChanged="reportableDailyStatus"></list-as-carousel>
      </div>
      <div class="">
        <h2 class="text-lg font-medium mr-auto flex capitalize">
          {{ dateToLargeFormat(current_month) }}
        </h2>

      </div>
      <!--  Dias-->
      <div  class="grid grid-cols-2 lg:grid-cols-7 md:grid-cols-4 text-center my-auto gap-2.5 gap-y-6 mt-5 mb-5" >
        <list-as-calendar :items="mappedDays" @itemLinkClicked="showModalWithDetail"></list-as-calendar>
      </div>
  </div>
<!--  detalle del dia en el calendario-->
  <slide-over title="" id="status-day-detail">

    <days-data-table
      v-if="current_day !== false"
      :reportable_id="reportable_id"
      :current_day="current_day"
      title="Detalle del día"
    ></days-data-table>

  </slide-over>
</template>
<script setup>
import {cprAxios} from "@/endpoint/endpointResolver";
import {reactive, toRefs, ref, computed} from 'vue'
import {useRoute, useRouter} from "vue-router";
import ContentHeader from "@/components/general/ContentHeader.vue";
import ListAsCarousel from "@/components/lists/list-as-carousel/ListAsCarousel.vue"
import ListAsCalendar from "@/components/lists/list-as-calendar/ListAsCalendar.vue"
import SlideOver from "@/components/modal/SlideOver.vue"
import DaysDataTable from "@/views/erm/checkpoint/report/detail/sections/DaysDataTable.vue";


const route = useRoute()
const router = useRouter()
const current_month = ref(null)
const loading_state = ref(true)
const reportable_id = parseInt(route.params.id)
const page_title = ref("Status de checkpoint...")


const state = reactive({
  months: [],
  days: []
})

const reportableMonthlyStatus = (month = null)=> {
  cprAxios.post('reportable-monthly-status', {
    reportable_id : reportable_id,
    current_month : month
  }).then(res => {
    state.months = res.data.months
    current_month.value = res.data.current_month
    loading_state.value = false
    page_title.value = "Status de " + res.data.name + " - " + res.data.sub_name

    reportableDailyStatus(res.data.current_month)
  }).catch(err => console.log(err))
}

const reportableDailyStatus = (current) => {
  cprAxios.post('reportable-daily-status',{
    reportable_id: reportable_id,
    month : current
  }).then(res =>{
    state.days = res.data.days
    current_month.value = current
  }).catch( err => console.log(err))

}

reportableMonthlyStatus()

const mappedItems = computed(() => {
  return state.months.map((item) => {
      return {
        index : item.month,
        ok_count:  item.ok_count,
        total_count: item.total_count,
        indicator: item.indicator,
        fulfillment: item.fulfillment
      }
  })
})

const mappedDays = computed(() => {
  return state.days.map((item) => {
    return {
      name : item.date,
      ok_count:  item.ok_count,
      total_count: item.total_count,
      indicator: item.indicator
    }
  })
})
const current_day = ref(false)

const showModalWithDetail = (cd) => {
  current_day.value = cd
  showSlideOver()
}

const showSlideOver = () => {
  const el = document.querySelector("#status-day-detail");
  const slideOver = tailwind.Modal.getOrCreateInstance(el);
  slideOver.show();
}

const hideSlideOver = () => {
  const el = document.querySelector("#status-day-detail");
  const slideOver = tailwind.Modal.getOrCreateInstance(el);
  slideOver.hide();

}

const dateToLargeFormat = (date) => {
  let parsedDate = new Date(date+"-01 00:00")
  let options = {year: 'numeric', month: 'long'}
  return parsedDate.toLocaleDateString("es-ES", options)
}
toRefs(state)
</script>

