<script setup lang='ts'>
import { onMounted } from 'vue'
import { scheduleTableColumns } from './sheduleTableColumns'
import DataTable from './DataTable.vue'
import { useScheduleStore } from '@/stores/schedule'
import { getDateString, getScheduleTableHeader } from '@/utils/dateHelper'

const scheduleStore = useScheduleStore()
async function getData() {
  // Fetch data from your API here.
  const todayDate = new Date(Date.now())
  const response = scheduleStore.getSchedule({
    date: getDateString(todayDate)
  })

  return response.data
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div
    class="rounded-md border h-fit"
  >
    <DataTable
      :date-string="getScheduleTableHeader(scheduleStore.getDate)"
      :columns="scheduleTableColumns"
      :data="scheduleStore.schedule"
    />
  </div>
</template>