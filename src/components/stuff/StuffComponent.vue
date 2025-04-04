<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth';

import { Button } from '@/components/ui/button'

import StuffFilters from './StuffFilters.vue';
import StuffTable from './StuffTable.vue';

const authStore = useAuthStore()
</script>

<template>
  <div class="w-5/10">
    <StuffFilters />
    <StuffTable />
    <div
      v-if="true"
      class="w-fit mt-3 ml-auto"
    >
      <Button
        v-if="authStore.isHeadteacher"
        variant="outline"
      >
        Добавить сотрудника
      </Button>
    </div>
  </div>
</template>