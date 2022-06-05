<template>
  <div>
    <content-header title="Vista del CRUD" icon="layers-icon">
      <DropdownButton  :buttons="mainButtons"/>
    </content-header>
    <DataTable :columns="getColumns" :endpoint="datatableEndpoint" :buttons="tableButtons" />
    <modal size="modal-xl" id="createModal" :title="getCreateModalTitle">
      <slot name="create-modal-slot"></slot>
    </modal>
    <slide-over id="columnsModal" title="Columnas" size="modal-sm"  >
      <form-switch v-for="column in getColumns" :key="column" :name="column.name"  value="1" :label="column.text" :switchCallback="onSwitchDataChanged" class="my-2" :checked="column.visible" ></form-switch>
    </slide-over>
  </div>
</template>

<script setup>
import {computed, ref} from "vue"
import ContentHeader from "@/components/general/ContentHeader.vue"
import DropdownButton from "@/components/button/DropdownButton.vue"
import DataTable from "@/components/datatable/DataTable.vue"
import Modal from "@/components/modal/Modal.vue"
import SlideOver from "@/components/modal/SlideOver.vue"
import FormSwitch from "@/components/form/switch/Switch.vue"


const props = defineProps({
  datatableEndpoint: {
    type: String
  },
  datatableColumns : {
    type : Array
  },
  pageTitle: {
    type : String
  },
  pageIcon: {
    type : String
  },
  createModalTitle: {
    type : String
  },
  updateModalTitle: {
    type : String
  }
})

// computed
const getColumns = computed(() => {
  return columns.value || []
})
const getCreateModalTitle = computed(() => {
  return props.createModalTitle|| 'Crear registro'
})
const getUpdateModalTitle = computed(() => {
  return updateModalTitle.value|| 'Modificar registro'
})

//data
const title = ref("pageTitle") || 'Home';
const icon = ref("pageIcon") || 'home-icon';
const columns = ref("datatableColumns") || [];
const mainButtons = [
  {
    caption : "Crear",
    id : "create-btn",
    icon : "plus-icon",
    url : "",
    remote : {
      modal_id : "createModal"
    }
  },
  {
    caption : "Exportar",
    id : "download-btn",
    icon : "download-icon",
    url : "",
    remote : false
  },
  {
    caption : "Columnas",
    id : "columns-btn",
    icon : "columns-icon",
    url : "",
    remote : {
      modal_id : "columnsModal"
    }
  }
]
const tableButtons = ref ([
  {
    caption : "Ver",
    icon : "folder-plus-icon",
    url : "",
    remote : false
  },
  {
    caption : "Modificar",
    icon : "edit-icon",
    url : "",
    remote : false,
  },
  {
    caption : "Eliminar",
    icon : "trash-2-icon",
    url : "",
    remote : false
  }
])

const onSwitchDataChanged = (data) => {
  let cols = []
  this.getColumns.forEach(function(value,index){
  if(value['name'] === data.name) {
  value['visible'] = data.value
 }
    cols.push(value)
  })
  this.columns = cols
}

</script>