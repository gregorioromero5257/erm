<template>
  <router-view />
</template>

<script setup>
  import { ref } from "vue";
  import {useUserStore} from '@/stores/user'
  const userStore = useUserStore()
  userStore.resolveUser()
</script>