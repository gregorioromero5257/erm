<template>
  <a
      href="javascript:;"
      data-tw-toggle="modal"
      data-tw-target="#warning-modal-preview"
      class=" btn btn-primary absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
    <CameraIcon class="w-4 h-4 text-white"/>
  </a>

  <div
      id="warning-modal-preview"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog"> <!-- cuadro de subir la imagen -->
      <div class="modal-content  ">
        <div class="modal-body p-0 ">
          <div class="p-5 text-center ">
            <Dropzone @sending="getDropzoneData" :options="{
                                    url: 'https://httpbin.org/post',
                                    thumbnailWidth: 150,
                                    maxFilesize: 0.5,
                                    maxFiles: 1,
                                  }" class="dropzone">
              <div class="text-lg font-medium ">
                Suelte los archivos aquí o haga clic para cargar
              </div>
            </Dropzone>

          </div>
          <div class="pb-5">
            <span v-if="getLoadingState" class="bg-primary"></span>
            <div class="h-12 w-full " v-else>

              <LoadingIcon icon="oval" class="mx-auto " color="#1A3175"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {ref, defineEmits, watch, computed} from "vue";
  const props = defineProps({
    loadingState : {
      required: true,
      type: Boolean
    }
  })
  const loadingStateChecker = ref(props.loadingState)

  watch(loadingStateChecker, (loadingStateValue) => {
    console.log(loadingStateValue)
  })

  const getLoadingState = () => {
    console.log(loadingStateChecker)
    return loadingStateChecker
  }

  const emit = defineEmits(['photoUpdated'])


  const getDropzoneData = (event) => {
    emit('photoUpdated', event)
  }
</script>