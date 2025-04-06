<script setup lang='ts'>
import { onBeforeMount } from 'vue'

import { useStudentsStore } from '@/stores/students'

import { getFullName } from '@/utils/getFullName'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const studentsStore = useStudentsStore()
onBeforeMount(() => {
  studentsStore.getStudents({})
})
</script>
<template>
  <Table>
    <TableHeader class="w-full">
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Фамилия Имя Отчество</TableHead>
        <TableHead>Класс</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody class="w-full">
      <TableRow
        v-for="student in studentsStore.students"
        :key="student.id"
      >
        <TableCell> {{ student.id }} </TableCell>
        <TableCell>{{ getFullName(student) }}</TableCell>
        <TableCell>{{ student.class }}</TableCell>
      </TableRow>
    </TableBody>
  </Table> 
</template>