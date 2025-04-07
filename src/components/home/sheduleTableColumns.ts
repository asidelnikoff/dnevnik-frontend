import { type ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue';
import ScheduleTableMenu from './ScheduleTableMenu.vue';
import type { ScheduleExtended } from '@/api/types/shedule';
import { useAuthStore } from '@/stores/auth';

// Here are defined table items.
// header() and cell() are render functions of a column.
// You can access row value with row.getValue()
export const scheduleTableColumns: ColumnDef<ScheduleExtended>[] = [
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
    cell: ({row}) => {
      const authStore = useAuthStore()
      if(!(authStore.isTeacher || authStore.isHeadteacher)) return null
      return h('div', {}, row.getValue('class'))
    }
  },
  {
    accessorKey: 'teacherFullName',
    header: () => null,
    cell: ({row}) => {
      const authStore = useAuthStore()
      if(authStore.isTeacher || authStore.isHeadteacher) return null
      return h('div', {}, row.getValue('teacherFullName'))
    }
  },
  {
    accessorKey: 'homework',
    header: () => null,
    cell: ({row}) => {
      return h('div', { class: 'w-25 overflow-hidden whitespace-nowrap text-ellipsis'}, row.getValue('homework'))
    }
  },
  {
    accessorKey: 'lessonGrade',
    header: () => null,
    cell: ({row}) => {
      const authStore = useAuthStore()
      if(authStore.isTeacher || authStore.isHeadteacher) return null
      return h('div', {}, row.getValue('lessonGrade'))
    }
  },
  {
    accessorKey: 'homeworkGrade',
    header: () => null,
    cell: ({row}) => {
      const authStore = useAuthStore()
      if(authStore.isTeacher || authStore.isHeadteacher) return null
      return h('div', {}, row.getValue('homeworkGrade'))
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const scheduleItem = row.original

      return h('div', { class: 'relative' }, h(ScheduleTableMenu, {
        scheduleItem,
      }))
    },
  },
]