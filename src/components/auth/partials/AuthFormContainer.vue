<template>
    <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              <span v-html="title"></span>
            </h2>
            <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
              <span v-html="mobileText"></span>
            </div>
            <slot>
            </slot>

            <div
              class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"
            >
              <span v-html="secondaryText"></span>
              <a class="text-primary dark:text-slate-200" :href="link"
                >{{ linkText }}</a
              >
            </div>
          </div>
        </div>
</template>

<script>
import { defineComponent, ref } from "vue"
export default defineComponent({
    props : {
      title : String ,
      mobileText : String,
      secondaryText : String,
      link : String,
      linkText : String
    },
    setup(props) {
        const title  = ref(props.title || 'Loguear')
        const mobileText  = ref(props.mobileText || 'Ingrese su correo y contraseña para loguear')
        const secondaryText  = ref(props.secondaryText || 'Recuerde visitar nuestro sitio <br>')
        const link  = ref(props.link || 'http://www.cmatik.cl/')
        const linkText  = ref(props.linkText || 'cmatik.cl')

        return {
            title,
            mobileText,
            secondaryText,
            link,
            linkText
        }
    },
})
</script>