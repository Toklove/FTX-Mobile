<template>
  <div>
    <router-view />
    <ChangeLang />
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>

<script setup>
import ChangeLang from "@/components/changeLang/ChangeLang.vue";</script>