import { createApp } from "vue";
import App from "./App.vue";
import "uno.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import "reset-css"; //初始化css样式
import { setupProdMockServer } from "../mock/mockProdServer";
import "./style.less";

const app = createApp(App);
// console.log(ElementPlusIconsVue);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 配置 store
setupStore(app);

// 配置路由
setupRouter(app);

console.log("环境变量", import.meta.env);
//代码模拟生产环境状态,用于测试上线后的mock数据
if (import.meta.env.MODE === "production" && import.meta.env.VITE_USE_MOCK === "true") {
  setupProdMockServer();
}

// 屏蔽黄色警告信息
app.config.warnHandler = () => null;
app.mount("#app");
