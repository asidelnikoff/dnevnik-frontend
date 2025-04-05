<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth';

import { Button } from '@/components/ui/button'

import StuffFilters from '@/components/stuff/StuffFilters.vue';
import StuffTable from '@/components/stuff/StuffTable.vue';

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
      <RouterLink :to="{name: 'registerStuff'}">
        <Button
          v-if="authStore.isHeadteacher"
          variant="outline"
        >
          Добавить учителя
        </Button>
      </RouterLink>
    </div>
  </div>
</template>