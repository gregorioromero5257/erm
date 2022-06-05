<template>
    <div 
        :id="id"
        class="toastify-content hidden flex"
    >
        <component :is="icon" :class="color"></component>
        <div class="ml-4 mr-4">
            <div class="font-medium">
                <span v-html="title"></span>
            </div>
            <div class="text-gray-600 mt-1">
                <span v-html="message"></span>
            </div>
          </div>
    </div>
</template>
<script>
    import {defineComponent, ref} from 'vue'
    import dom from "@left4code/tw-starter/dist/js/dom";
    import Toastify from 'toastify-js'
    
    export default defineComponent({
        props : {
            icon : String,
            title : String,
            message : String,
            id : String,
            color : String,

        },
        setup(props) {
            const icon = ref(props.icon || 'check-circle-icon')
            const title  = ref(props.title || '')
            const message = ref(props.message || '')
            const id = ref(props.id || '#notification-content')
            const color = ref(props.color || 'text-primary')

            const showToast = (id) => {
                 Toastify({
                    node: dom(id)
                    .clone()
                    .removeClass('hidden')[0],
                    duration: props.duration || 3000,
                    newWindow: props.newWindow ||true,
                    close: props.close || true,
                    gravity: props.gravity || 'top',
                    position: props.position || 'right',
                    stopOnFocus: props.stopOnFocus || true
                }).showToast()
            }

            
            return {
                icon,
                title,
                message,
                id,
                color,
                showToast
            }
        }
    })
</script>