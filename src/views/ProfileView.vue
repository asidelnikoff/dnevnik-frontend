<script setup lang="ts">
import ProfileForm from '@/components/profile/ProfileForm.vue';

const onSubmit = (values: object) => {
  console.log(values)
}
</script>

<template>
  <div>
    <ProfileForm @submit="onSubmit" />
  </div>
</template>