<script setup lang='ts'>
import { scheduleTableColumns } from './sheduleTableColumns'
import DataTable from './DataTable.vue'
import { getScheduleTableHeader } from '@/utils/dateHelper'
import { useScheduleStore } from '@/stores/schedule'

const scheduleStore = useScheduleStore()
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