<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth';

import { Button } from '@/components/ui/button'

import SummaryFilters from '@/components/summary/SummaryFilters.vue';
import SummaryTable from '@/components/summary/SummaryTable.vue';

const authStore = useAuthStore()
</script>

<template>
  <div class="w-5/10">
    <SummaryFilters />
    <SummaryTable />
    <div
      v-if="true"
      class="w-fit mt-3 ml-auto"
    >
      <RouterLink :to="{name: 'createLesson'}">
        <Button
          v-if="authStore.isHeadteacher"
          variant="outline"
        >
          Создать урок
        </Button>
      </RouterLink>
    </div>
  </div>
</template>