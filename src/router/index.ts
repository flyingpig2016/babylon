import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createWebHashHistory, createRouter } from "vue-router";
import { basicRoutes } from "./routes";

// console.log("basicRoutes", basicRoutes);

export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHashHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
  app.provide("router", router);
}
