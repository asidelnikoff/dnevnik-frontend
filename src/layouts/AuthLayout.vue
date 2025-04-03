<script setup lang="ts">
import { useShadowColor } from '@/composables/useShadowColor'

const { shadowColor } = useShadowColor()
</script>

<template>
  <div class="flex w-screen h-screen">
    <div class="h-full" />
    <div
      class="flex items-center ml-auto p-20 justify-center h-full shadow-xl"
      :class="shadowColor"
    >
      <RouterView />
    </div>
  </div>
</template>