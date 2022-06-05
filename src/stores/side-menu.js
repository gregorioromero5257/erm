import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
        // No mostar por ahora, hasta proximo aviso
      // {
      //   icon: "HomeIcon",
      //   pageName: "home",
      //   title: "Dashboard",
      // },
      // {
      //   icon: "SettingsIcon",
      //   pageName: "crud-test",
      //   title: "Crud Test",
      // },

      {
        icon: "PieChartIcon",
        pageName: "dashboard",
        title: "Dashboard",
      }

    ],
  }),
});
