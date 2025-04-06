<script setup lang='ts'>
import { onBeforeMount } from 'vue'

import { useSummaryStore } from '@/stores/summary'

import { getFullName } from '@/utils/getFullName'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const summaryStore = useSummaryStore()
onBeforeMount(() => {
  summaryStore.getSummary({})
})
</script>
<template>
  <Table>
    <TableHeader class="w-full">
      <TableRow>
        <TableHead>Класс</TableHead>
        <TableHead>Урок</TableHead>
        <TableHead>Учитель</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody class="w-full">
      <TableRow
        v-for="summary in summaryStore.summary"
        :key="summary.id"
      >
        <TableCell>{{ summary.class }}</TableCell>
        <TableCell>{{ summary.subject }}</TableCell>
        <TableCell>{{ getFullName(summary.teacher) }}</TableCell>
      </TableRow>
    </TableBody>
  </Table> 
</template>