<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth';

import { Button } from '@/components/ui/button'

import SummaryFilters from '@/components/summary/SummaryFilters.vue';
import SummaryTable from '@/components/summary/SummaryTable.vue';
import { computed, onBeforeMount, ref, watch, type Ref } from 'vue';
import {
  CalendarDate,
  getLocalTimeZone,
} from '@internationalized/date'
import type { DateRange } from 'reka-ui';
import { useSummaryStore } from '@/stores/summary';
import { transformToApiDate } from '@/utils/tranformToApiDate';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import { toast } from 'vue-sonner';

const authStore = useAuthStore()

const today = new Date(Date.now())
const date = ref({
  start: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()),
  end: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()).add({ days: 7 }),
}) as Ref<DateRange>
const classes = ref<string[]>([])

const params = computed(() => {
  return {
    startDate: transformToApiDate(date!.value!.start!.toDate(getLocalTimeZone())),
    endDate: transformToApiDate(date!.value!.end!.toDate(getLocalTimeZone())),
    classes: classes.value,
  }
})

const summaryStore = useSummaryStore()
watch(params, () => {
  getSummary()
}, {
  deep: true,
})

const isLoading = ref(false)
onBeforeMount(() => {
  getSummary()
})

async function getSummary() {
  isLoading.value = true
  try {
    await summaryStore.getSummary(params.value)
    toast('Сводное расписание загружено')
  } catch {
    toast('Не удалось загрузить сводное расписание')
  }
  isLoading.value = false
}
</script>

<template>
  <div class="max-w-5/10">
    <SummaryFilters
      v-model:date="date"
      v-model:classes="classes"
    />
    <Skeleton
      v-if="isLoading"
      class="h-50 w-full"
    />
    <SummaryTable v-else-if="Object.keys(summaryStore.summary).length > 0" />
    <div
      v-else
      class="text-center"
    >
      Данные отсутствуют
    </div>
    <div
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