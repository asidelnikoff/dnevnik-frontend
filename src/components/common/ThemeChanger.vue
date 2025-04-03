<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useColorMode } from '@vueuse/core'

import { Sun, Moon } from 'lucide-vue-next'

const mode = useColorMode();
function toggleMode() {
  if (mode.value === 'light') {
    mode.value = 'dark';
    return;
  }
  mode.value = 'light';
}
</script>

<template>
  <Button
    class="rounded-full"
    variant="ghost"
    size="icon"
    @click="toggleMode"
  >
    <Moon 
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Sun
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>