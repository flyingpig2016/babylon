const LAYOUT = () => import("@/components/layout/index.vue");

const HOMEPAGE = "/topo/babyBasis";
// const HOMEPAGE = "/dingdingRobot/managementList";

// 定义模块类型
interface ModuleType {
  default: any;
}

// 自动生成基于文件系统的路由配置
// const modules: Record<string, ModuleType> = import.meta.glob(
//   "@/views/**/*.vue",
//   { eager: true }
// );

const modules = import.meta.glob("@/views/**/*.vue");

// 处理路由路径的函数
function generateRoutePath(filePath: string): string {
  // 移除开头的 @/views/ 或 /src/views/
  const newPath = filePath
    .replace(/^(@\/views\/|\/src\/views\/)/, "") // 移除路径前缀
    .replace(/\/index\.vue$/, "") // 移除 index.vue 后缀
    .replace(/[\u4e00-\u9fa5]+/g, (match) => encodeURIComponent(match)); // 对中文进行编码

  return newPath;
}

// 生成路由配置
const generateRoutes = () => {
  const routes = [];

  for (const path in modules) {
    const routePath = generateRoutePath(path);
    // 使用解码后的中文作为标题
    const title = decodeURIComponent(routePath.split("/").pop() || "");
    const name = routePath.split("/").filter(Boolean).join("-");
    // 根据文件路径生成路由配置
    const route = {
      path: routePath,
      name,
      component: modules[path], // 使用 .default 获取组件
      meta: {
        title: title, // 使用解码后的中文作为标题
        ignoreKeepAlive: true,
      },
    };

    routes.push(route);
  }

  return routes;
};

const routes = [
  {
    path: "/",
    name: "home",
    redirect: HOMEPAGE,
    ignoreKeepAlive: true,
  },

  {
    path: "/topo",
    name: "topo",
    component: LAYOUT,
    redirect: "/topo",
    meta: {
      orderNo: 1,
      icon: "ion:grid-outline",
      title: "拓扑管理",
    },
    // > import("/src/views/babyBasis/index.vue")
    children: generateRoutes(), // 使用自动生成的路由配置
  },
];

console.log("routes", routes);
export const basicRoutes = [...routes];
