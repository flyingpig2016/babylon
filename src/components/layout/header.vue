<template>
  <ElMenu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <ElMenuItem v-for="route in routes" :index="route!.path" @click="gotoPage(route)">{{
      route!.meta!.title
    }}</ElMenuItem>
  </ElMenu>
</template>

<script lang="ts" setup>
  import { ElMenu, ElMenuItem } from "element-plus";
  import { inject, onMounted, ref } from "vue";
  import { Router } from "vue-router";
  import type { RouteRecordRaw } from "vue-router";
  import { useUserStore } from "@/store/modules/user";
  import { storeToRefs } from "pinia";

  defineOptions({ name: "LayoutHeader" });

  const routes = ref<RouteRecordRaw[]>([]);
  const router = inject("router") as Router; //获取档期app的router对象
  const userStore = useUserStore();

  const { curRoute } = storeToRefs(userStore);
  // console.log(currentRoute);
  const activeIndex = ref<string>("qualityCoverage");

  const getRoutes = (name: string) => {
    const allRoutes = router.getRoutes();
    const curRoutes: RouteRecordRaw[] = allRoutes.filter((item) => item.name === name);
    if (curRoutes.length) {
      routes.value = curRoutes[0].children as RouteRecordRaw[];
    }
  };
  const gotoPage = (route: RouteRecordRaw) => {
    console.log(route);
    userStore.setCurRoute(route.path);
    router.push(route.path);
  };

  onMounted(() => {
    getRoutes("problemPosition");

    if (curRoute.value) {
      activeIndex.value = curRoute.value;
    }
  });
</script>
