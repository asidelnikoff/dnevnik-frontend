<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import LoginForm from '@/components/Login/LoginForm.vue';

const onSubmit = (values: object) => {
  console.log(values)
}
</script>

<template>
  <div class="flex flex-col gap-3 w-fit">
    <h2 class="text-3xl font-bold">
      С возвращением,
    </h2>
    <LoginForm @submit="onSubmit" />
    <Button variant="link">
      Забыл пароль
    </Button>
  </div>
</template>