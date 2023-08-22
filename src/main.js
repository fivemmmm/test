// 引入初始化样式文件
import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

//测试接口函数
// import { getCateGory } from "./apis/testAPI";
// getCateGory().then((res) => {
//   console.log(res);
// });
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
