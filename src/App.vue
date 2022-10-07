<template>
  <div>
    <router-view />
    <ChangeLang />
  </div>
</template>

<style lang="scss">
body {
  background: rgb(249, 249, 249);
}

#app {
  width: 100%;
  height: 100%;
}
</style>

<script setup>
import ChangeLang from "@/components/changeLang/ChangeLang.vue";
import { onBeforeMount } from "vue";
import { check } from "@/api/user";
import router from "@/router";


onBeforeMount(() => {
  //如果用户已经登录 则在每次刷新页面时校验当前登录是否还有效
  let token = localStorage.getItem("TOKEN");
  if (token) {
    check().then(res => {
      if (!res.data) {
        localStorage.clear();
        router.push("/login");
      }
    });
  }
});
</script>