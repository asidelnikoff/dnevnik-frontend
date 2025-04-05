<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore()
const greeting = computed(() => {
  if (!authStore?.user?.role) {
    return 'Здравствуйте!'
  }
  if (authStore.user.role === 'Ученик') {
    return `Привет, ${authStore.user.name}!` 
  } else if (authStore.user.middleName) {
    return `Добрый день, ${authStore.user.name + ' ' + authStore.user.middleName}!` 
  } else {
    return `Добрый день, ${authStore.user.name}!`
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold">
    {{ greeting }}
  </h2>
</template>