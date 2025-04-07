<script setup lang='ts'>
import type { PropType } from 'vue';

import { getFullName } from '@/utils/getFullName'

import type { Student } from '@/api/types/users';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

defineProps({
  students: {
    type: Array as PropType<Student[]>,
    required: true,
  }
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
        v-for="student in students"
        :key="student.id"
      >
        <TableCell> {{ student.id }} </TableCell>
        <TableCell>{{ getFullName(student) }}</TableCell>
        <TableCell>{{ student.class }}</TableCell>
      </TableRow>
    </TableBody>
  </Table> 
</template>