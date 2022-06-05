<template>
  <div class=" sm:mt-10 font-medium text-center lg:text-left lg:mt-3">
    <h5 class="text-lg border-b flex mb-4">
      <BookIcon class="w-5 h-5 mr-2"/>
      Detalle del contacto
    </h5>
  </div>
  <div class="flex flex-col justify-center sm:items-start lg:items-start mt-4 ">
    <div class="truncate sm:whitespace-normal flex items-center ">
      <UserIcon class="w-4 h-4 mr-2"/>
      {{ user.first_name }} {{ user.last_name }}
    </div>
    <div class="truncate sm:whitespace-normal flex items-center mt-3">
      <MailIcon class="w-4 h-4 mr-2"/>
      {{ user.email }}
    </div>
    <div class="truncate sm:whitespace-normal flex items-center mt-3">
      <PhoneIcon class="w-4 h-4 mr-2"/>
      {{ user.phone }}
    </div>
    <div class="truncate sm:whitespace-normal flex items-center mt-3">
      <MapPinIcon class="w-4 h-4 mr-2"/>
      {{ user.address }}
    </div>
  </div>

</template>
<script setup>
  const props = defineProps({
    user : {
      required : true,
      type: Object
    }
  })

</script>