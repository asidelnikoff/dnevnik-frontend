<script setup lang='ts'>
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';

defineProps({
  amount: {
    type: Number,
    default: 5,
  }
})
</script>

<template>
  <div
    class="flex flex-col gap-3"
  >
    <Skeleton
      v-for="i in amount"
      :key="i"
      class="w-full h-10 rounded-sm"
    />
  </div>
</template>