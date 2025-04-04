<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth';

import { Button } from '@/components/ui/button'

import StudentsFilters from './StudentsFilters.vue';
import StudentsTable from './StudentsTable.vue';

const authStore = useAuthStore()
</script>

<template>
  <div class="w-5/10">
    <StudentsFilters />
    <StudentsTable />
    <div
      v-if="true"
      class="w-fit mt-3 ml-auto"
    >
      <RouterLink :to="{name: 'registerStudent'}">
        <Button
          v-if="authStore.isHeadteacher"
          variant="outline"
        >
          Добавить ученика
        </Button>
      </RouterLink>
    </div>
  </div>
</template>