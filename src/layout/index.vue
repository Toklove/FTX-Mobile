<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

//底部tab栏相关
const tabBar = computed(() => [
  {
    title: t("menu.home"),
    to: {
      name: "Home"
    },
    icon: "home-o"
  },
  {
    title: t("menu.coins"),
    to: {
      name: "Bibi"
    },
    icon: "home-o"
  },
  {
    title: t("menu.options"),
    to: {
      name: "QiQuan"
    },
    icon: "home-o"
  },
  {
    title: t("menu.contract"),
    to: {
      name: "HeYue"
    },
    icon: "home-o"
  },
  {
    title: t("menu.assets"),
    to: {
      name: "Base"
    },
    icon: "user-o"
  }
]);

const handleChange = (value) => {
  // console.log(value,'valueeeeeee');
};
</script>

<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
      <RequestLoading></RequestLoading>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabBar" @chang="handleChange"></TabBar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>