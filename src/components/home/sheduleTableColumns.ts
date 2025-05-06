import { type ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue';
import ScheduleTableMenu from './ScheduleTableMenu.vue';
import { useAuthStore } from '@/stores/auth';
import type { GetScheduleResponse } from '@/api/services/scheduleService';
import { getFullName } from '@/utils/getFullName';
import type { Grade } from '@/api/types/shedule';
import GradeItem from './GradeItem.vue';
import HomeworkItem from './HomeworkItem.vue';

// Here are defined table items.
// header() and cell() are render functions of a column.
// You can access row value with row.getValue()
export const scheduleTableColumns: ColumnDef<GetScheduleResponse[number]>[] = [
  {
    accessorKey: 'start_time',
    header: () => null,
    cell: ({row}) => {
      return h('div', {title: 'Время начала'}, row.getValue('start_time'))
    }
  },
  {
    accessorKey: 'subject',
    header: () => null,
    cell: ({row}) => {
      return h('div', {title: 'Предмет'}, row.getValue('subject'))
    }
  },
  {
    accessorKey: 'class',
    header: () => null,
    cell: ({row}) => {
      const authStore = useAuthStore()
      if(!(authStore.isTeacher || authStore.isHeadteacher)) return null
      return h('div', {title: 'Класс'}, row.getValue('class'))
    }
  },
  {
    accessorKey: 'teacher',
    header: () => null,
    cell: ({row}) => {
      const authStore = useAuthStore()
      if(authStore.isTeacher || authStore.isHeadteacher) return null
      return h('div', {title: 'Учитель'}, getFullName(row.getValue('teacher')))
    }
  },
  {
    accessorKey: 'homework',
    header: () => null,
    cell: ({row}) => {
      if(!row.getValue('homework')) return null
      return h('div', {}, h(HomeworkItem, {
        homework: row.getValue('homework') as string
      }))
    }
  },
  {
    accessorKey: 'grades',
    header: () => null,
    cell: ({row}) => {
      const authStore = useAuthStore()
      if(authStore.isTeacher || authStore.isHeadteacher) return null
      const grades = row.getValue('grades') as Array<Grade>
    
      return h('div', 
        { class: 'flex gap-1' }, 
        grades.map(grade => 
          h('div', {}, h(GradeItem, {
            grade
          }))
        )
      )
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
    cell: ({ row }) => {
      const scheduleItem = row.original
      const authStore = useAuthStore()
      if (authStore.isStudent) return null
      return h('div', { class: 'relative' }, h(ScheduleTableMenu, {
        scheduleItem,
      }))
    },
  },
]