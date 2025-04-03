<script setup lang="ts">
import ThemeChanger from './components/common/ThemeChanger.vue';
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="relative">
    <ThemeChanger class="theme-changer" />
    <component :is="route.meta.layout">
      <RouterView />
    </component>
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