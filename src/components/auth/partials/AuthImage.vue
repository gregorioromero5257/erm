<template>
    <div class="my-auto">
            <img
              :alt="mainText"
              class="-intro-x w-1/2 -mt-16 "
              src="https://storage.googleapis.com/cmatik-dev-alternate-site/illustration.svg"
            /> <!-- se debe subir la imagen en cloud storage en la ruta cmatik-dev-alternate-site -->
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              <span v-html="mainText"></span>
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400"
            >
              <span v-html="secondaryText"></span>
            </div>
          </div>
</template>
<script>
import { defineComponent , ref } from "vue"
export default defineComponent({
    props: {
        image : String,
        mainText : String,
        secondaryText : String
    },  
    setup(props) {
        const image = ref(props.image || 'https://storage.googleapis.com/cmatik-dev-alternate-site/illustration.svg')
        const mainText = ref(props.mainText || 'Manejo eficiente de <br> los recursos hídricos')
        const secondaryText = ref(props.secondaryText || "Ingresa a nuestro sitio para obtener mas información")

        return {
            image,
            mainText,
            secondaryText
        }
    },
})
</script>