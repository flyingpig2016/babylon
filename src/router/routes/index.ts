const LAYOUT = () => import("@/components/layout/index.vue");

const HOMEPAGE = "/topo/babyBasis";
// const HOMEPAGE = "/dingdingRobot/managementList";

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
    children: [

      {
        path: "babyBasis",
        name: "babyBasis",
        component: () => import("@/views/babyBasis/01起步/index.vue"),
        meta: {
          title: "起步",
          ignoreKeepAlive: true,
        },
      },
    ],
  },

];

export const basicRoutes = [...routes];
