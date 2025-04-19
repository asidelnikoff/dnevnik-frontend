<script setup lang='ts'>
import { onBeforeMount, ref, watch } from 'vue';

import { useAuthStore } from '@/stores/auth';
import { useStudentsStore } from '@/stores/students';

import { type GetStudentsParams } from '@/api/services/usersService';

import { Button } from '@/components/ui/button'

import StudentsFilters from '@/components/students/StudentsFilters.vue';
import StudentsTable from '@/components/students/StudentsTable.vue';


const authStore = useAuthStore()

const params = ref<GetStudentsParams>({
  search: '',
})
watch(params, () => {
  getStudents();
}, {
  deep: true
})

const studentsStore = useStudentsStore()
function getStudents() {
  studentsStore.getStudents(params.value)
}

onBeforeMount(() => {
  getStudents()
})
</script>

<template>
  <div class="w-5/10">
    <StudentsFilters v-model:search="params.search" />
    <StudentsTable :students="studentsStore.students" />
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