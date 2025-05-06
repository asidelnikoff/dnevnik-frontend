<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore()
const greeting = computed(() => {
  if (!authStore?.user?.role) {
    return 'Здравствуйте!'
  }
  if (authStore.user.role === 'student') {
    return `Привет, ${authStore.getName}!` 
  } else if (authStore.getMiddleName) {
    return `Добрый день, ${authStore.getName + ' ' + authStore.getMiddleName}!` 
  } else {
    return `Добрый день, ${authStore.getName}!`
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold">
    {{ greeting }}
  </h2>
</template>