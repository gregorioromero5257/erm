<template>
  <div class=" gap-0 px-3 pb-2  rounded-md text-gray-800 h-full dark:text-gray-800
        grid grid-cols-4 "
        @click="sendCallbackData(item.name)"
       :class="[calculate_color_class(item.indicator), {'cursor-pointer': totalIsCreaterThanZero}]">
    <div class=" rounded-full bg-white text-blue-800 border border-primary font-bold relative mt-1 ml-1 h-7 w-7
          justify-center text-center pt-1 -top-2 -left-5 dark:bg-darkmode-400 dark:text-slate-200 dark:border-slate-200">
      {{extractDay(item.name)}}
    </div>

    <span class=" col-span-4 flex justify-between bg-white p-1 text-gray-800 rounded-lg dark:border-darkmode-100/40
    dark:text-gray-800"  >
            <Tippy v-if="totalIsCreaterThanZero" tag="a" href="javascript:;" class="tooltip" content="Ver detalle" :options="{
                      theme: 'light',
                    }"
            >
              <span class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110
              hover:text-primary duration-300 hover:font-bold">
              <div>
                <ListIcon class=" ml-2 mt-0.5 font-bold h-4 w-4"/>
              </div>
              </span>
            </Tippy>
            <div class="mr-2" v-if="totalIsCreaterThanZero">
              <Tippy tag="a" href="javascript:;" class="tooltip " content="Reporte Completos" :options="{
                        theme: 'light',
                      }">
                <span class="  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:text-primary
                duration-300 hover:font-bold" >{{ item.ok_count }}</span>
              </Tippy>
              <Tippy tag="a" href="javascript:;" class="tooltip " content="Reportes Obligatorios" :options="{
                        theme: 'light',
                      }">
                <span class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-primary
                duration-300 hover:font-bold"> /{{ item.total_count }}</span>
              </Tippy>
            </div>
            <div class="text-sm ml-2" v-else>
              Sin reporte
            </div>
    </span>
  </div>
</template>
<script setup>
  import calculate_color_class from "@/utils/indicator-color-calculation";

  import {computed, defineEmits, ref} from "vue"

  const props = defineProps({
    item : {
      required : true,
      type: Object
    },
    index : {
      required: true,
      type: Number
    }
  })

  const emit = defineEmits(['itemClicked'])

  // Function para deshabilitar el detalle cuando sea 0
  const sendCallbackData = (value) => {
    if(totalIsCreaterThanZero.value) {
      emit("itemClicked", value)
    }
  }

  const extractDay = (text)=>{
  return text.substring(text.length - 2)
  }

//mostrar caja vacia

  const totalIsCreaterThanZero = computed (() => {
    return props.item.total_count>0
  })




</script>