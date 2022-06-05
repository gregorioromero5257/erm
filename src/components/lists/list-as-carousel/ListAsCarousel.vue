<template>
  <div class="mx-6 pb-8 " v-if="items.length !== 0" >
    <carousel ref="carousel"
              :wrap-around="true"
              :touchDrag="true"
              :settings='settings'
              :breakpoints='breakpoints'
              :mouseDrag="true"
    >
      <slide class="px-2 mb-10 mt-10" v-for="item in items" :key="item" >
        <div class=" carousel__item months-layers  font-medium bg-white  dark:bg-darkmode-400 rounded-lg grid grid-cols-8
            cursor-pointer" @click="changeCurrentItem(item.index)" :class="checkIsSelected(item.index)" >
          <div class="col-span-5 grid justify-items-stretch" >
            <div class="mt-3 justify-self-start" >
                    <span class=" ml-4 col-span-5 font-bold text-lg text-gray-600 dark:bg-darkmode-400 dark:text-slate-200 " >
                         {{item.index}}
                    </span>
            </div>
            <div class="h-auto flex justify-between mb-3">
              <CalendarIcon class=" mt-8 ml-3 text-slate-400 w-11 h-11" />
              <div class=" flex items-end  mr-3 text-lg text-gray-800 rounded-lg dark:border-darkmode-100/40 dark:text-gray-800 ">
                <Tippy tag="a" href="javascript:;" class="tooltip" content="Reporte Completos" :options="{
                            theme: 'light',
                          }">
                      <span class=" transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110
                      hover:text-primary duration-300 hover:font-bold dark:text-slate-200" >{{ item.ok_count}}</span>
                </Tippy>
                <Tippy tag="a" href="javascript:;" class="tooltip " content="Reportes Obligatorios" :options="{
                                theme: 'light',
                              }">
                      <span class=" transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:text-primary
                      duration-300 hover:font-bold dark:text-slate-200" >/{{ item.total_count }}</span>
                </Tippy>
              </div>
            </div>
          </div>
          <div class=" col-span-3 rounded-r-lg grid place-content-center" :class="calculate_color_class(item.indicator)">
            <span class=" text-center w-full  md:mr-6 mr-4  text-white  text-2xl    font-bold ">{{item.fulfillment}}%</span>
            <!--aqui-->
          </div>
        </div>

      </slide>
      <template #addons>
        <pagination class="-mt-5"></pagination>
        <navigation></navigation>
      </template>

    </carousel>
  </div>
</template>
<script setup>

import calculate_color_class from "@/utils/indicator-color-calculation";
import {defineEmits} from "vue";
import { Carousel, Pagination,Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const settings = {
  itemsToShow: 1,
  snapAlign: 'center',
}
const breakpoints = {
  1024: {
    itemsToShow: 4,
    snapAlign: 'left',

  },
  768: {
    itemsToShow: 1.70,
    snapAlign: 'center',
  },
  480: {
    itemsToShow: 1.70,
    snapAlign: 'center',
  }
}

const emit = defineEmits(['currentItemChanged'])

const props = defineProps({
  items : {
    required : true,
    type: Array
  },
  current_item : {
    required : true
  }
})

const changeCurrentItem = (current) => {
  emit('currentItemChanged', current)
}

const checkIsSelected = (item) => {
  let current_class = false
  if (item === props.current_item)  {
    current_class = true
  }
  return {
    'shadow-lg shadow-slate-400' : current_class,
    '-mt-10 duration-300' : current_class,
    'dark:shadow-lg shadow-slate-400' : current_class,
  }
}
</script>

<style >
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0) scale(1) ;

}
.carousel__slide--next > .carousel__item {
  transform: scale(0.8) translate(-10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.8) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1);
}
.carousel__pagination{
  padding: 10px;
  margin-top: 20px;
}
.carousel__pagination-item{
  color: #FFFFFF;
  min-width: 10px !important;
  min-height: 10px !important;
}
.carousel__pagination-button{
  background-color: #9ca3af !important;
}
/*redeploy*/
.carousel__pagination-button--active{
  background-color: #223E8C !important;
}
.carousel__prev {
  background-color: #94a3b8 !important;
  color: white;

}
.carousel__next{
  background-color: #94a3b8 !important;
  color: white;
}
</style>