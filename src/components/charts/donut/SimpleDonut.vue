<template>
  <Chart
      type="doughnut"
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
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  dataChart: {
    type: Array,
    default: []
  }
});

const darkMode = computed(() => useDarkModeStore().darkMode);
const colorScheme = computed(() => useColorSchemeStore().colorScheme);

const chartColors = () => [

  colors.primary(0.9),
  colors.pending(0.9),
  colors.warning(0.9),
];

const data = computed(() => {
  return {
    labels: ["Yellow", "Dark"],
    datasets: [
      {
        data: props.dataChart,
        backgroundColor: colorScheme.value ? chartColors() : "",
        hoverBackgroundColor: colorScheme.value ? chartColors() : "",
        borderWidth: 2,
        borderColor: darkMode.value ? colors.darkmode[700]() : colors.white,
      },
    ],
  };
});

const options = computed(() => {
  return {
    legend: {
      display: false,
    },
    cutoutPercentage: 83,
  };
});
</script>
