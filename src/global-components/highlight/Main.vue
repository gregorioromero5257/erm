<template>
  <pre v-highlight-directive>
    <slot></slot>
    <textarea v-model="copySource" class="fixed w-1 h-1"></textarea>
  </pre>
</template>

<script setup>
import dom from "@left4code/tw-starter/dist/js/dom";
import { copySource } from "./index";
import jsBeautify from "js-beautify";
import hljs from "highlight.js";
import _ from "lodash";

const vHighlightDirective = {
  beforeMount(el) {
    let source = dom(el).find("code").find("textarea").html();

    // Format for beautify
    source = _.replace(source, /&lt;/g, "<");
    source = _.replace(source, /&gt;/g, ">");

    // Beautify code
    source = jsBeautify.html(source);

    // Save for copy code function
    copySource.value = source;

    // Format for highlight.js
    source = _.replace(source, /</g, "&lt;");
    source = _.replace(source, />/g, "&gt;");

    dom(el).find("code").html(source);

    hljs.highlightElement(dom(el).find("code")[0]);
  },
};
</script>

<style scoped>
textarea {
  margin-left: 1000000px;
}
</style>
