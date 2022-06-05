import { defineStore } from "pinia";

export const useTopMenuStore = defineStore("topMenu", {
  state: () => ({
    menu: [
      // {
      //   icon: "HomeIcon",
      //   pageName: "top-menu-home",
      //   title: "Dashboard",
      // },
      // {
      //   icon: "SettingsIcon",
      //   pageName: "top-menu-crud-test",
      //   title: "Crud Test",
      // },
      {
        icon: "PieChartIcon",
        pageName: "top-menu-dashboard",
        title: "Dashboard",
      }
    ],
  }),
});
