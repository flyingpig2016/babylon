<template>
  <ElContainer>
    <!-- <ElHeader>
      <LayoutHeader />
    </ElHeader> -->
    <ElMain>
      <RouterView>
        <template #default="{ Component, route }">
          <transition mode="out-in" appear>
            <keep-alive v-if="!route.meta.ignoreKeepAlive">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath" />
          </transition>
        </template>
      </RouterView>
    </ElMain>
  </ElContainer>
</template>

<script lang="ts" setup>
  import { ElContainer, ElMain } from "element-plus";
  defineOptions({ name: "PageLayout" });
  // import LayoutHeader from "./header.vue";
</script>
