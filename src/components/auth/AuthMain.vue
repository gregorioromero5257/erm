<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <auth-logo></auth-logo>
          <auth-image></auth-image>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Form -->
        <auth-form-container>
            <slot></slot>
        </auth-form-container>
        <!-- END: Form -->
      </div>
    </div>
  </div>
</template>

<script setup>
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import MainColorSwitcher from "@/components/main-color-switcher/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import AuthLogo from "@/components/auth/partials/AuthLogo.vue"
import AuthImage from "@/components/auth/partials/AuthImage.vue"
import AuthFormContainer from "@/components/auth/partials/AuthFormContainer.vue";

 dom("body").removeClass("main").removeClass("error-page").addClass("login");


</script>
