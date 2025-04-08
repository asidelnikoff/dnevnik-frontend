<script setup lang='ts'>
import { type ScheduleExtended } from '@/api/types/shedule';
import GradesFilters from '@/components/grades/GradesFilters.vue';
import StudentsTable from '@/components/grades/StudentsTable.vue';
import { useScheduleStore } from '@/stores/schedule';
import { useStudentsStore } from '@/stores/students';
import { onBeforeMount, ref } from 'vue';

import Button from '@/components/ui/button/Button.vue';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';

const studentsStore = useStudentsStore()

const gradeItem = ref<ScheduleExtended>()

const scheduleStore = useScheduleStore()

onBeforeMount(() => {
  studentsStore.getStudents({})
  gradeItem.value = scheduleStore.gradeItem
})

const router = useRouter()
function handleSaveGrades() {
  toast('Оценки сохранены')
  router.push({ name: 'home'}) 
}
</script>

<template>
  <h2
    v-if="!gradeItem?.id"
    class="text-xl"
  >
    Урок не выбран
  </h2>
  <div v-else>
    <GradesFilters :grade-item />
    <StudentsTable
      class="mt-5"
      :students="studentsStore.students"
    />
    <div class="mt-5 ml-auto w-fit">
      <Button @click="handleSaveGrades">
        Сохранить
      </Button>
    </div>
  </div>
</template>