<template>
  <div class="intro-y box mt-5 ">
    <div
        class=" flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
    >
      <h2 class="font-medium text-lg text-primary mr-auto">Cambio foto de Perfil</h2>


    </div>
    <div id="warning-modal" class="p-5  grid grid-cols-8">
      <div class="bg-blue-100 text-white mx-auto w-48 h-48  col-span-8 lg:col-span-4 md:col-span-4">
        photo
      </div>
      <div class="preview py-5 col-span-8 lg:col-span-4 md:col-span-4 my-auto">
        <!-- BEGIN: Modal Toggle -->
        <div class="text-center">
          <a
              href="javascript:;"
              data-tw-toggle="modal"
              data-tw-target="#warning-modal-preview"
              class="btn btn-primary "
          >
            <CameraIcon class="w-5 h-5 text-white pr-1"/>
            Subir Imagen</a
          >
        </div>
        <!-- END: Modal Toggle -->
        <!-- BEGIN: Modal Content -->
        <div
            id="warning-modal-preview"
            class="modal"
            tabindex="-1"
            aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content ">
              <div class="modal-body p-0 ">
                <div class="p-5 text-center ">
                  <Dropzone ref-key="dropzoneSingleRef" :options="{
                  url: 'https://httpbin.org/post',
                  thumbnailWidth: 150,
                  maxFilesize: 0.5,
                  maxFiles: 1,
                  headers: { 'My-Awesome-Header': 'header value' },
                }" class="dropzone">
                    <div class="text-lg font-medium">
                      Suelte los archivos aquí o haga clic para cargar
                    </div>
                  </Dropzone>
                </div>
                <div class="px-5 pb-8 text-center">
                  <button
                      type="button"
                      data-tw-dismiss="modal"
                      class="btn w-24 btn-primary "
                  >
                    Ok
                  </button>
                </div>
                <div
                    class="p-5 text-center border-t border-slate-200/60 dark:border-darkmode-400"
                >
                  <a href="" class="text-primary"
                  >Por qué tengo este problema?</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Modal Content -->
      </div>

    </div>
  </div>

</template>
