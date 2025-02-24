<script setup lang="ts">
  import { ElConfigProvider } from "element-plus";
  import zhCn from "element-plus/es/locale/lang/zh-cn";
  import en from "element-plus/es/locale/lang/en";
  import { computed, ref } from "vue";
  import "dayjs/locale/zh-cn";

  const language = ref("zh-cn");
  const locale = computed(() => (language.value === "zh-cn" ? zhCn : en));
  // const toggle = () => {
  //   language.value = language.value === "zh-cn" ? "en" : "zh-cn";
  //   console.log(locale.value);
  // };
</script>

<template>
  <ElConfigProvider :locale="locale">
    <!-- <ElButton @click="toggle">Switch Language</ElButton> -->
    <RouterView />
  </ElConfigProvider>
</template>

<style lang="less"></style>
