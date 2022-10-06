<template>
  <div class="loading">
    <van-loading />
  </div>
</template>

<script setup></script>

<script lang="ts">
export default {
  name: "DataLoading"
};
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
