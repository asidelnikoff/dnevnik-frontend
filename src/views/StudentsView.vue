<script setup lang='ts'>
import { onBeforeMount, ref, watch } from 'vue';

import { useAuthStore } from '@/stores/auth';
import { useStudentsStore } from '@/stores/students';

import { type GetStudentsParams } from '@/api/services/usersService';

import { Button } from '@/components/ui/button'

import StudentsFilters from '@/components/students/StudentsFilters.vue';
import StudentsTable from '@/components/students/StudentsTable.vue';
import { toast } from 'vue-sonner';
import ListSkeleton from '@/components/common/ListSkeleton.vue';

const authStore = useAuthStore()

const params = ref<GetStudentsParams>({
  firstName: '',
  lastName: '',
  middleName: '',
  class: '',
})
watch(params, () => {
  getStudents();
}, {
  deep: true
})

const studentsStore = useStudentsStore()

const isLoading = ref(false)
async function getStudents() {
  isLoading.value = true
  try {
    await studentsStore.getStudents(params.value)
  } catch {
    toast('Не удалось получить список учеников')
  }
  isLoading.value = false
}

onBeforeMount(() => {
  getStudents()
})
</script>

<template>
  <div class="min-w-6/10">
    <StudentsFilters
      v-model:first-name="params.firstName"
      v-model:last-name="params.lastName"
      v-model:middle-name="params.middleName"
      v-model:class-name="params.class"
    />

    <ListSkeleton v-if="isLoading" />
    <StudentsTable
      v-else
      :students="studentsStore.students"
    />

    <div
      v-if="authStore.isHeadteacher"
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