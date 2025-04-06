<script setup lang='ts'>
import { Calendar } from '@/components/ui/calendar'
import { useScheduleStore } from '@/stores/schedule'
import { getDateString } from '@/utils/dateHelper'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { type Ref, ref, watch } from 'vue'

const date = ref(today(getLocalTimeZone())) as Ref<DateValue>

const scheduleStore = useScheduleStore()
watch(date, () => {
  const formattedDate = getDateString(date.value.toDate(getLocalTimeZone()) as Date)
  scheduleStore.getSchedule({
    date: formattedDate,
  })
})
</script>

<template>
  <Calendar
    v-model="date"
    locale="ru"
    :weekday-format="'short'"
    class="rounded-md border h-fit"
  />
</template>