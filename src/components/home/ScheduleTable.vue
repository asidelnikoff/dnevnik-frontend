<script setup lang='ts'>
import { ref } from 'vue'

import { onMounted } from 'vue'
import { scheduleTableColumns } from './sheduleTableColumns'
import DataTable from './DataTable.vue'
import { useScheduleStore } from '@/stores/schedule'
import type { ScheduleTableItem } from '@/api/types/shedule'
import { getFullName } from '@/utils/getFullName'
import { getDateString, getScheduleTableHeader } from '@/utils/dateHelper'

const data = ref<ScheduleTableItem[]>([])

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
  const responseData = await getData()
  data.value = responseData.map(scheduleItem => {
    return {
      ...scheduleItem,
      teacherFullName: getFullName(scheduleItem.teacher)
    }
  })
})
</script>

<template>
  <div
    class="rounded-md border h-fit"
  >
    <DataTable
      :date-string="getScheduleTableHeader(scheduleStore.getDate)"
      :columns="scheduleTableColumns"
      :data="data"
    />
  </div>
</template>