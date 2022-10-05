<script lang="ts" setup>
import { reactive, toRefs } from "vue";

//底部tab栏相关
const useTabBar = () => {
  const state = reactive({
    tabBar: [
      {
        title: "首页",
        to: {
          name: "Home",
        },
        icon: "home-o",
      },
      {
        title: "币币",
        to: {
          name: "Bibi",
        },
        icon: "home-o",
      },
      {
        title: "期权",
        to: {
          name: "QiQuan",
        },
        icon: "home-o",
      },
      {
        title: "合约",
        to: {
          name: "HeYue",
        },
        icon: "home-o",
      },
      {
        title: "资产",
        to: {
          name: "Base",
        },
        icon: "user-o",
      },
    ],
  });
  return toRefs(state);
};
const { tabBar } = useTabBar();

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