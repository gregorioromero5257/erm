<template>
  <div class="intro-x ">
    <h2 class=" text-lg font-medium mb-5 flex justify-between ">
      <span class=" ">{{ title }}</span>
      <span class=" bg-slate-400 flex items-center justify-center  text-base text-white rounded px-2 ">{{ total_items }}</span>
    </h2>
    <!--filter-->
    <div class=" relative text-slate-500 my-3 box">
      <div class="  absolute rounded-l-md w-10 h-10 flex items-center justify-center bg-slate-100
        border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 ">
        <SearchIcon class="w-4 h-4" />
      </div>
      <input
          type="search"
          placeholder="Filtrar listado"
          v-model="query"
          class="form-control  pl-12 h-10"
      />
    </div>
  </div>
  <div class=" overflow-y-auto overflow-x-hidden max-h-[1030px]">
    <div
        v-for="(item, index) in filteredItems"
        :key="item.id"
        class="intro-x cursor-pointer"
    >
      <item-with-indicator :item="item" route_name="checkpoint">

      </item-with-indicator>
    </div>
  </div>
  <!--     end of items list     -->
</template>
<script setup>
  import ItemWithIndicator from "@/components/lists/list-with-indicator/ItemWithIndicator.vue"
  import {computed, reactive, ref} from "vue";



  const filtered_items  = ref(null)
  const query = ref ('')

  const props = defineProps({
    title : {
      required : true
    },
    items : {
      required : true,
      type : Array
    }
  })

  const total_items = computed (()=>{
    if (filtered_items.value === null || filtered_items.value === props.items.length) {
      return props.items.length
    } else {
      return filtered_items.value + ' / ' + props.items.length
    }
  })

  const filteredItems = computed(()=>{
    let filtered = props.items.filter(item => {
          return item.name.toLowerCase().includes(query.value.toLowerCase()) ||
              item.sub_name.toLowerCase().includes((query.value.toLowerCase()))
        }
    )
    filtered_items.value = filtered.length
    return filtered
  })


</script>