<script setup lang='ts'>
import { type ScheduleGradeItem } from '@/api/types/shedule';
import GradesFilters from '@/components/grades/GradesFilters.vue';
import StudentsTable from '@/components/grades/StudentsTable.vue';
import { useScheduleStore } from '@/stores/schedule';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import Button from '@/components/ui/button/Button.vue';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { type GetScheduleResponse } from '@/api/services/scheduleService';
import ListSkeleton from '@/components/common/ListSkeleton.vue';
import { useGradesStore } from '@/stores/grades';
import { getFullName } from '@/utils/getFullName';

const gradeItems = ref<ScheduleGradeItem[]>()
const scheduleItem = ref<GetScheduleResponse[number]>()
const gradesStore = useGradesStore()
const scheduleStore = useScheduleStore()
const route = useRoute()
const isLoading = ref(false)
onBeforeMount(async () => {
  scheduleItem.value = scheduleStore.findById(route.params.id as string)
  if (!scheduleItem.value) {
    router.push({ name: 'home' })
  }

  isLoading.value = true
  const response = await gradesStore.getScheduleGrades(route.params.id as string)
  gradeItems.value = response.data
  isLoading.value = false
})

const nameFilter = ref('')
const filteredGradeItems = computed(() => {
  if (gradeItems.value) {
    return gradeItems.value.filter((gradeItem) => getFullName(gradeItem.student).toLowerCase().includes(nameFilter.value.toLowerCase()))
  }
  return []
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
      @input="(value: string) => nameFilter = value"
    />
    <ListSkeleton
      v-if="isLoading"
      class="mt-3"
    />
    <StudentsTable
      v-else-if="filteredGradeItems.length > 0 && scheduleItem"
      class="mt-5"
      :grade-items="filteredGradeItems"
      :schedule-item
    />
    <div
      v-else
      class="text-center mt-3"
    >
      Ученики отсутствуют
    </div>
    <div class="mt-5 ml-auto w-fit">
      <Button @click="handleSaveGrades">
        Сохранить
      </Button>
    </div>
  </div>
</template>