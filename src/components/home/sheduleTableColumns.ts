import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue';
import ScheduleTableMenu from './ScheduleTableMenu.vue';
import type { ScheduleTableItem } from '@/api/types/shedule';

export const scheduleTableColumns: ColumnDef<ScheduleTableItem>[] = [
  {
    accessorKey: 'startTime',
    header: () => null,
  },
  {
    accessorKey: 'subject',
    header: () => null,
  },
  {
    accessorKey: 'class',
    header: () => null,
  },
  {
    accessorKey: 'teacherFullName',
    header: () => null,
  },
  {
    accessorKey: 'homework',
    header: () => null,
  },
  {
    accessorKey: 'lessonGrade',
    header: () => null,
  },
  {
    accessorKey: 'homeworkGrade',
    header: () => null,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(ScheduleTableMenu, {
        payment,
      }))
    },
  },
]