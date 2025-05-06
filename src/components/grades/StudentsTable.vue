<script setup lang='ts'>
import { type PropType } from 'vue';
import { getFullName } from '@/utils/getFullName';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import GradesComponent from './GradesComponent.vue';
import type { ScheduleGradeItem } from '@/api/types/shedule';
import { type GetScheduleResponse } from '@/api/services/scheduleService';

defineProps({
  gradeItems: {
    type: Array as PropType<ScheduleGradeItem[]>,
    required: true,
  },
  scheduleItem: {
    type: Object as PropType<GetScheduleResponse[number]>,
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
        <TableHead>Оценка</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody class="w-full">
      <TableRow
        v-for="(item, id) in gradeItems"
        :key="item.student.id"
      >
        <TableCell> {{ id + 1 }} </TableCell>
        <TableCell>{{ getFullName(item.student) }}</TableCell>
        <TableCell>
          <GradesComponent
            :student-id="item.student.id"
            :schedule-item
          />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table> 
</template>