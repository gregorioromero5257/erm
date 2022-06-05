<template>
  <div>
    <div class="intro-y box mt-2">
      <div class="mb-2 intro-y flex justify-between items-center">
        <div class="flex px-4 mt-2">
          <div class="input-group">
            <div id="input-group-search" class="input-group-text">
              <SearchIcon class="w-4 h-4" />
            </div>
            <input type="text" class="form-control" v-model="search" @keyup="onSearch()" :placeholder="text.search" :aria-label="text.search" aria-describedby="input-group-search" />
          </div>
        </div>
        <div>
          <div class="rounded flex mr-4">
            <span class="mt-4 mr-4"><span v-html="text.show_entries"></span></span>
            <select class="form-select mt-2 sm:mr-2" aria-label="Registros de la tabla" v-model="limit" v-on:change="getData(); changePage(1);">
              <option  v-for="entry in showEntries" :key="entry" :value="entry">{{ entry }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
          <tr class="bg-theme-23 dark:bg-dark-2" >

            <th v-for="column in getColumns" :key="column" id="{{ column.name }}" v-bind:class="{ 'hidden': !column.visible }" class="border-b-2 dark:border-dark-5 whitespace-nowrap cursor-pointer" v-on:click="sortColumns(column.name)">
              <div class="flex justify-between ">
                {{ column.text }}
                <span v-if="sortColumn && sortColumn === column.name ">
                                        <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" v-if="sortDirection === 'desc'" />
                                        <ChevronUpIcon class="w-4 h-4 ml-auto sm:ml-2" v-else />
                                    </span>

              </div>
            </th>
            <th v-if="withButtons" class="border-b-2 text-center dark:border-dark-5 whitespace-nowrap cursor-pointer w-12">
              <MoreVerticalIcon class="w-4 h-4 mx-auto"/>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row,index) in getRows" :key="index" :class="{ 'bg-gray-100 dark:bg-dark-5' : isOdd(index) }" class="py-0 hover:bg-gray-300 dark:hover:bg-dark-7">
            <td v-for="column in getColumns" :key="column" class="border-b dark:border-dark-5 py-0" v-bind:class="{ 'hidden': !column.visible }" >{{ row[column.name] }}</td>
            <td v-if="withButtons()" class="border-b dark:border-dark-5 py-0">
              <DropdownButton :buttons="getButtons" class="my-0 mt-0 py-0" mainButton="btn-sm btn-secondary my-0 dark:bg-gray-600"/>
            </td>
          </tr>
          <tr v-show="!getRows.length">
            <td  class="text-center"  :colspan="this.columns.length + 1"><span v-html="text.empty"></span></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="intro-y flex justify-center md:justify-between items-center p-3" v-if="this.$route.query.page <= this.totalPages || !this.$route.query.page">
        <div class="hidden md:flex" v-if="totalPages > 1"><span v-html="text.showing"></span> <strong class="mx-2">{{ pageStart + 1 }}</strong> / <strong class="mx-2">{{ pageEnd }}</strong> <span v-html="text.of"></span> <strong class="mx-2">{{ totalRows }}</strong> <span v-html="text.records"></span> </div>
        <div class="hidden md:flex" v-else><span v-html="text.showing" class="mr-2"></span> {{ totalRows }} <span v-html="text.records" class="ml-2"></span></div>
        <ul class="mt-2 hidden md:flex">
          <li class="mx-1  rounded-lg">
            <a class="flex items-center  disabled px-3 py-2 rounded" v-on:click="previousPage()" v-bind:class="checkPreviousPage()" href="javascript:void(0);">
              <span class="mx-1 "><span v-html="text.previous"></span></span>
            </a>
          </li>
          <li v-for="page in displayPages" :key="page" class="mx-1 rounded-lg invisible md:visible">
            <a class="flex font-bold  active px-3 py-2 rounded" v-on:click="changePage(page)" v-bind:class="isCurrentPage(page)" href="javascript:void(0);">{{ page }}</a>
          </li>

          <li class="mx-1 rounded-lg">
            <a class="flex items-center px-3 py-2 rounded" v-on:click="nextPage()" v-bind:class="checkNextPage()" href="javascript:void(0);">
              <span class="mx-1"><span v-html="text.next"></span></span>
            </a>
          </li>
        </ul>
        <ul class="flex mt-2 md:hidden">
          <li class="mx-1  rounded-lg">
            <a class="flex items-center  disabled px-3 py-2 rounded" v-on:click="previousPage()" v-bind:class="checkPreviousPage()" href="javascript:void(0);">
              <span class="mx-1 "><span v-html="text.previous"></span></span>
            </a>
          </li>

          <li class="mx-1 rounded-lg">
            <a class="flex items-center px-3 py-2 rounded" v-on:click="nextPage()" v-bind:class="checkNextPage()" href="javascript:void(0);">
              <span class="mx-1"><span v-html="text.next"></span></span>
            </a>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script setup>

import {ref, computed, onMounted} from "vue"
import axios from "axios";
import router from '@/router'

const props = defineProps({
  columns: {
    type: Array
  },
  endpoint: {
    type: String
  },
  searchText: {
    type: String
  },
  showEntriesText: {
    type: String
  },
  showingText: {
    type: String
  },
  ofText: {
    type: String
  },
  emptyText: {
    type: String
  },
  recordsText: {
    type: String
  },
  previousText: {
    type: String
  },
  nextText: {
    type: String
  },
  buttons: {
    type: Array
  }
})
const currentRoute = router.currentRoute.value
//data
const showEntries = ref ([10,25,50,100]);
const rows = ref ([]);
const limit = ref (10);
const currentPage = ref (parseInt(currentRoute.query.page)) || 1;
const paginatedRows = ref ([]);
const pageStart = ref (0);
const pageEnd = ref (0);
const totalRows = ref (0);
const sortColumn = ref ('');
const sortDirection = ref ('desc');
const search = ref ('');
const awaitingSearch = ref(false);
const text = ref ({
  "search" : props.searchText || "Buscar...",
  "show_entries" : props.showEntriesText || "Mostrar",
  "showing" : props.showingText || "Mostrando ",
  "of" : props.ofText || "de",
  "records" : props.recordsText || " registro(s)",
  "previous" : props.previousText || "Anterior",
  "next" : props.nextText || "Siguiente",
  "empty" : props.emptyText || "No hay registros para mostrar"
})
//mounted
onMounted(() => {
  getData.value;
})

//computed
const getButtons = computed(() => {
  return props.buttons || []
})
const getColumns = computed(() => {
  return props.columns || []
})
const getRows = computed(() => {
  return rows.value || []
})
const totalPages = computed(() => {
  return Math.ceil(totalRows.value / limit.value)
})
const displayPages = computed(() => {
    let arrayLen = (currentPage.value > 99) ? 3 : 5;
    if ([1, 2].includes(currentPage.value)) currentPage.value = 3;
    else if ([totalPages -1, totalPages].includes(currentPage.value)) currentPage.value = totalPages - Math.trunc(arrayLen / 2);
  return [...Array(arrayLen).keys()].map(i => i - Math.trunc(arrayLen / 2) + currentPage.value)
})


//methods
const getData = async () => {
  {
    await axios.get(
        this.endpoint,
        {
          params: {
            page: currentPage.value,
            entries: limit.value,
            sortColumn: sortColumn.value,
            sortDirection: sortDirection.value,
            search: search.value
          }
        }
    ).then((response) => {
      totalRows.value = response.data.total
      pageStart.value = (currentPage.value * limit.value) - this.limit
      pageEnd.value = currentPage.value * limit.value
      rows.value = response.data.data
    })
  }
}
  const onSearch = () => {
    if (!awaitingSearch.value) {
      setTimeout(() => {
        changePage(1)
        getData();
        awaitingSearch.value = false;
      }, 1000); // 1 sec delay
    }
    awaitingSearch.value = true;
  }
  const sortColumns = (index) => {
    console.log(sortColumn.value, index)
    if (sortColumn.value !== index) {
      sortColumn.value = index
    }
    sortDirection.value = (sortDirection.value === 'asc') ? 'desc' : 'asc'
    getData()
  }
  const isOdd = (value) => {
    return value % 2;
  }
  const changePage = (page) => {
    currentPage.value = page
    getData()
    this.$router.push({
      path: this.$route.path, query: {
        page: currentPage.value
      }
    })
  }
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
    changePage.value(currentPage.value)
  }
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
    changePage.value(currentPage.value)
  }
const isCurrentPage= (page) => {
  if(page <= totalPages.value) {
    if(page === currentPage.value) {
      if(totalPages.value === 1) {
        return 'btn-secondary ml-5'
      }
      return 'btn-primary'
    } else {
      return 'btn-secondary';
    }
  } else {
    return 'hidden'
  }
}
const checkPreviousPage =() => {
  if(currentPage.value > 1) {
    return 'font-bold btn-secondary'
  } else {
    return 'cursor-text'
  }
}
const checkNextPage = () =>{
  if(currentPage.value < totalPages.value) {
    return 'font-bold btn-secondary'
  } else {
    return 'cursor-text'
  }
}
const withButtons = () =>{
  return getButtons.length > 0
}

// no borrar

</script>