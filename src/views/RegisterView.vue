<script setup lang="ts">
import RegisterForm from '@/components/Register/RegisterForm.vue';

const onSubmit = (values: object) => {
  console.log(values)
}
</script>

<template>
  <div class="flex flex-col gap-3 w-fit">
    <h2 class="text-3xl font-bold">
      Добро пожаловать!
    </h2>
    <RegisterForm @submit="onSubmit" />
  </div>
</template>