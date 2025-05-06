<script setup lang='ts'>
import CalendarFilter from '@/components/home/CalendarFilter.vue';
import ScheduleTable from '@/components/home/ScheduleTable.vue';
import UserGreeting from '@/components/home/UserGreeting.vue';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { useScheduleStore } from '@/stores/schedule';
import { transformToApiDate } from '@/utils/tranformToApiDate';
import { computed, nextTick, onBeforeMount, ref, watch } from 'vue';
import { toast } from 'vue-sonner';

const date = ref<DateValue>(today(getLocalTimeZone()))
const params = computed(() => {
  return {
    startDate: transformToApiDate(date.value.toDate(getLocalTimeZone()) as Date),
    endDate: transformToApiDate(date.value.toDate(getLocalTimeZone()) as Date),
  }
})

const isLoading = ref(false)
watch(params, () => {
  getSchedule();
}, {
  deep: true
})

const scheduleStore = useScheduleStore()
async function getSchedule() {
  await nextTick()
  isLoading.value = true;
  try {
    await scheduleStore.getSchedule({
      startDate: params.value.startDate,
      endDate: params.value.endDate,
    })
  } catch {
    toast('Не удалось загрузить расписание')
  }
  isLoading.value = false;
}

onBeforeMount(() => {
  getSchedule()
})
</script>

<template>
  <div class="flex flex-col gap-10 w-fit">
    <UserGreeting />
    <div class="flex gap-10">
      <Skeleton
        v-if="isLoading"
        class="w-71 h-71"
      />
      <ScheduleTable
        v-else
        class="min-w-71"
      />
      <CalendarFilter v-model:date="date as DateValue" />
    </div>
  </div>
</template>