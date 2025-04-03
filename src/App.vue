<script setup lang="ts">
import ThemeChanger from './components/common/ThemeChanger.vue';
</script>

<template>
  <div class="relative">
    <ThemeChanger class="theme-changer" />
    <RouterView />
  </div>
</template>

<style scoped lang='scss'>
.theme-changer {
  top: 20px;
  right: 20px;
  position: absolute;
}
</style>

<style lang='scss'>
//
// Global styles
//
button {
  cursor: pointer;
}
</style>