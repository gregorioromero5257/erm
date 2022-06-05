<template>
  <div class="intro-y h-full box lg:my-0 ">
    <h2 class="p-5 text-lg font-medium truncate ">Hora con más problemas</h2>



      <div class="overflow-x-auto">

          <table class="table table-lg table-striped relative">
            <thead>
            <tr>
              <th class="whitespace-nowrap">Hora</th>
              <th class="whitespace-nowrap text-right">Cantidad</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
              <td>{{item.hour}}</td>
              <td class="text-right">{{item.count}}</td>
            </tr>
            </tbody>
          </table>

      </div>


  </div>

    <!--  <span class=" justify-self-auto ">{{ item.hour}}</span>-->
    <!--  <span class=" justify-self-end ">{{ item.count }}</span>-->

</template>
<script setup>
const props = defineProps({
  items : {
    required : true,
    type : String
  }
})

</script>