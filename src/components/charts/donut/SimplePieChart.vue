<template>
  <Chart
      type="pie"
      :width="width"
      :height="height"
      :data="data"
      :options="options"
  />
</template>

<script setup>
import { computed } from "vue";
import { useDarkModeStore } from "@/stores/dark-mode";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { colors } from "@/utils/colors";

const props = defineProps({
  width: {
    type: Number,
    default: 120,
  },
  height: {
    type: Number,
    default: 120,
  },
  data: {
    type: Array,
    default: []
  },
  labels: {
    type: Array
  },

});

const darkMode = computed(() => useDarkModeStore().darkMode);
const colorScheme = computed(() => useColorSchemeStore().colorScheme);


const chartColors = () => [
  colors.primary(0.9),
  colors.pending(0.9),
  colors.warning(0.9),
];
console.log(props.labels)
const data = computed(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: colorScheme.value ? chartColors() : "",
        hoverBackgroundColor: colorScheme.value ? chartColors() : "",
        borderWidth: 4,
        borderColor: darkMode.value ? colors.darkmode[700]() : colors.white,
      },
    ],
  };
});

const options = computed(() => {
  return {
    legend: {
      display: true,
    },
  };
});
</script>
