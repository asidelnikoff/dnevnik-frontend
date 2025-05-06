<script setup lang='ts'>
import { type ScheduleGradeItem } from '@/api/types/shedule';
import GradesFilters from '@/components/grades/GradesFilters.vue';
import StudentsTable from '@/components/grades/StudentsTable.vue';
import { useScheduleStore } from '@/stores/schedule';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import Button from '@/components/ui/button/Button.vue';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { type GetScheduleResponse } from '@/api/services/scheduleService';
import ListSkeleton from '@/components/common/ListSkeleton.vue';
import { useGradesStore } from '@/stores/grades';

const gradeItems = ref<ScheduleGradeItem[]>()
const scheduleItem = ref<GetScheduleResponse[number]>()
const gradesStore = useGradesStore()
const scheduleStore = useScheduleStore()
const route = useRoute()
const isLoading = ref(false)
onBeforeMount(async () => {
  scheduleItem.value = scheduleStore.findById(route.params.id as string)

  isLoading.value = true
  const response = await gradesStore.getScheduleGrades(route.params.id as string)
  gradeItems.value = response.data
  isLoading.value = false
})

const router = useRouter()
async function handleSaveGrades() {
  try {
    await gradesStore.saveGrades(scheduleItem!.value!.id)
    toast('Оценки сохранены')
    router.push({ name: 'home'}) 
  } catch {
    toast('Не удалось сохранить оценки')
  }
}
</script>

<template>
  <div>
    <GradesFilters
      v-if="scheduleItem"
      :schedule-item
    />
    <ListSkeleton
      v-if="isLoading"
      class="mt-3"
    />
    <StudentsTable
      v-else-if="gradeItems && scheduleItem"
      class="mt-5"
      :grade-items
      :schedule-item
    />
    <div class="mt-5 ml-auto w-fit">
      <Button @click="handleSaveGrades">
        Сохранить
      </Button>
    </div>
  </div>
</template>