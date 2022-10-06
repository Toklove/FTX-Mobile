import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { piniaStore, vuexStore } from "./store";

// 移动端适配
import "lib-flexible/flexible.js";

// 引入全局样式
import "@/assets/scss/index.scss";

// 全局引入按需引入UI库 vant
import { vantPlugins } from "./plugins/vant.js";

//全局公共组件
import components from "./plugins/components.js";

//引入国际化
import i18n from "@/plugins/i18n";


createApp(App)
  .use(i18n)
  .use(vuexStore)
  .use(piniaStore)
  .use(router)
  .use(vantPlugins)
  .use(components)
  .mount("#app");
