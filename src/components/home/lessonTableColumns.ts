import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue';
import LessonTableMenu from './LessonTableMenu.vue';

export type Lesson = {
  id: string;
  time: string;
  subject: string;
  teacherFullName: string;
  homework: string;
}

export const lessonTableColumns: ColumnDef<Lesson>[] = [
  {
    accessorKey: 'time',
    header: () => null,
  },
  {
    accessorKey: 'subject',
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(LessonTableMenu, {
        payment,
      }))
    },
  },
]