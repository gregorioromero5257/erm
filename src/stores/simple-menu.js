import { defineStore } from "pinia";

export const useSimpleMenuStore = defineStore("simpleMenu", {
  state: () => ({
    menu: [
      // {
      //   icon: "HomeIcon",
      //   pageName: "simple-menu-home",
      //   title: "Dashboard",
      // },
      // {
      //   icon: "SettingsIcon",
      //   pageName: "simple-menu-crud-test",
      //   title: "Crud Test",
      // },

      {
        icon: "PieChartIcon",
        pageName: "simple-menu-dashboard",
        title: "Dashboard",
      }

    ],
  }),
});
