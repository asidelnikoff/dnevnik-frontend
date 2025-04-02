<script setup lang='ts'>
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
  <div class="flex flex-col gap-3 w-fit">
    <h1 class="text-5xl font-bold text-center mb-5">
      Мега-Дневник
    </h1>
    <RouterLink :to="{ name: 'login' }">
      <Button class="w-full">
        Вход
      </Button>
    </RouterLink>
    <RouterLink :to="{ name: 'register' }">
      <Button
        class="w-full"
        variant="outline"
      >
        Зарегистрироваться
      </Button>
    </RouterLink>
  </div>
</template>