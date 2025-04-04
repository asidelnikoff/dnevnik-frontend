<script setup lang='ts'>
import { onBeforeMount } from 'vue'

import { useStudentsStore } from '@/stores/students'

import type { Student } from '@/api/types/student'

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
  studentsStore.getStudents()
})

function getStudentFullName(student: Student): string {
  let result = `${student.lastName} ${student.name}`
  if (student.middleName) {
    result += ' ' + student.middleName
  }
  return result;
}
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
        <TableCell>{{ getStudentFullName(student) }}</TableCell>
        <TableCell>{{ student.class }}</TableCell>
      </TableRow>
    </TableBody>
  </Table> 
</template>