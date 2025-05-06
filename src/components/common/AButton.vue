<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue';
import { Loader2 } from 'lucide-vue-next';

defineProps({
  loading: {
    type: Boolean
  }
})
</script>

<template>
  <Button v-if="!loading">
    <slot />
  </Button>
  <Button
    v-else
    disabled
  >
    <slot />
    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
  </Button>
</template>