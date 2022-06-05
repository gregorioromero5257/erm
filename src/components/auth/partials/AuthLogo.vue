<template>
    <a href="" class="-intro-x flex items-center pt-5">
        <img
            :alt="name + ' - ' + description "
            class="w-24"
            :src="logo"
        />
        <span class="text-white text-lg ml-3"> 
            <span class="text-2xl font-bold">{{ name }}</span><br>
            <span class="font-medium">{{ description }}</span>
        </span>
    </a>
</template>
<script>
    import { defineComponent, ref } from "vue";

    export default defineComponent({
        props : {
            name : String,
            description : String,
            logo : String
        },
        setup(props) {
            const name = ref(props.name || 'ERM')
            const description = ref(props.description || 'Efficent Resource Manager')
            const logo  = ref(props.logo ||'https://storage.googleapis.com/cmatik-dev-alternate-site/logo.svg')

            return {
                name,
                description, 
                logo
            }
        }
    })
</script>