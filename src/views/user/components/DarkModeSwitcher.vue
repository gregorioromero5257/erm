<template>
  <button @click="switchMode" v-if="!darkMode" class="btn btn-secondary rounded-full">
    <MoonIcon class="" iconclass="w-4 h-4 text-white"/>
  </button>

  <button @click="switchMode" v-if="darkMode" class="btn btn-secondary rounded-full">
    <SunIcon iconclass="w-4 h-4 text-white"/>
  </button>
</template>
<script setup>
  import {useDarkModeStore} from "@/stores/dark-mode";
  import {computed, defineEmits} from "vue";

  const darkModeStore = useDarkModeStore();
  const darkMode = computed(() => darkModeStore.darkMode);

  const emit = defineEmits(['userDarkModeChanged'])

  const setDarkModeClass = () => {
    darkMode.value
        ? dom("html").addClass("dark")
        : dom("html").removeClass("dark");
  };

  const switchMode = () => {
    darkModeStore.setDarkMode(!darkMode.value);
    setDarkModeClass();
    emit('userDarkModeChanged', !darkMode.value)
  };
  setDarkModeClass();
</script>