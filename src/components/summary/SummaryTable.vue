<script setup lang='ts'>
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { computed } from 'vue'
import Button from '../ui/button/Button.vue'
import { Trash2 } from 'lucide-vue-next'
import { transformApiDateToWeekDay } from '@/utils/dateHelper'
import type { ScheduleValue } from '@/api/types/shedule'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { getApiWeekDay } from '@/utils/selectValues'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const authStore = useAuthStore()
const summaryStore = useSummaryStore()

const classes = computed(() => {
  return Object.keys(summaryStore.summary).sort()
})
const weekDays = computed(() => {
  return Object.keys(summaryStore.summary[Object.keys(summaryStore.summary)[0]])
  .filter((value) => !(transformApiDateToWeekDay(value).startsWith('Воскресенье')));
})
const timeValues = [
  '08:00 - 08:40',
  '08:50 - 09:30',
  '09:50 - 10:30',
  '10:50 - 11:30',
  '11:50 - 12:30',
  '12:40 - 13:20',
  '13:40 - 14:20'
] 

async function deleteLesson(lesson: ScheduleValue, weekDay: string, id: number) {
  try {
    await summaryStore.deleteLesson(lesson, weekDay, id)
    toast('Урок успешно удален')
  } catch {
    toast('Не удалось удалить урок')
  }
}

function createLesson(className: string, weekDay: string, time: string) {
  console.log(time)
  summaryStore.setNewLessonData({
    class: className,
    week_days: [getApiWeekDay(transformApiDateToWeekDay(weekDay).split('(')[0].trim())],
    start_time: time.split('-')[0].trim() + ':00',
  })
  router.push({ name: 'createLesson '})
}
</script>
<template>
  <div class="flex overflow-auto max-h-170 [&_tr:hover]:bg-inherit [&_td:hover]:bg-inherit">
    <div>
      <Table>
        <TableHeader class="sticky">
          <TableRow>
            <TableHead class="text-center border-r-1">
              День недели
            </TableHead>
            <TableHead class="text-center">
              Время
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template
            v-for="weekDay in weekDays"
            :key="weekDay"
          >
            <TableRow
              class="h-14"
            >
              <TableCell
                class="text-center border-r-1"
                :rowspan="timeValues.length"
              >
                {{ transformApiDateToWeekDay(weekDay) }}
              </TableCell>
              <TableCell class="text-center">
                {{ timeValues[0] }}
              </TableCell>
            </TableRow>
      
            <TableRow
              v-for="(timeValue) in timeValues.slice(1)"
              :key="timeValue"
              class="h-14"
            >
              <TableCell class="text-center">
                {{ timeValue }}
              </TableCell>
            </TableRow>
          </template>
        </TableBody> 
      </Table> 
    </div>
    <div
      v-for="className in classes"
      :key="className"
    >
      <Table
        class="border-l-1"
      >
        <TableHeader class="w-full">
          <TableRow>
            <TableHead
              class="text-center"
              colspan="3"
            >
              {{ className }}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody class="w-full">
          <template
            v-for="weekDay in weekDays"
            :key="weekDay"
          >
            <TableRow
              v-for="(lesson, id) in summaryStore.summary[className][weekDay]"
              :key="id"
              class="h-14"
            >
              <template v-if="lesson.value !== null">
                <TableCell class="text-left">
                  {{ lesson.value.subject }}
                </TableCell>
                <TableCell class="text-left">
                  {{ getFullName(lesson.value.teacher) }}
                </TableCell>
                <TableCell v-if="authStore.isHeadteacher">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        class="rounded-full"
                        type="button"
                        variant="ghost"
                        size="icon"
                      >
                        <Trash2
                          class="w-4 h-4"
                        />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Удалить урок?</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div>Вы действительно хотите <b>удалить</b> урок?</div>
                          <br>
                          <div><b>Дата: </b>{{ transformApiDateToWeekDay(weekDay) }}</div>
                          <div><b>Урок: </b>{{ lesson.value.subject }}</div>
                          <div><b>Учитель: </b>{{ getFullName(lesson.value.teacher) }}</div>
                          <div><b>Класс: </b>{{ lesson.value.class }}</div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction @click="deleteLesson(lesson.value, weekDay, id)">
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent> 
                  </AlertDialog>
                </TableCell>
              </template>
              <TableCell
                v-else
                colspan="3"
              >
                <div
                  v-if="authStore.isHeadteacher"
                  class="flex justify-center items-center w-full"
                >
                  <div class="w-fit">
                    <RouterLink :to="{name: 'createLesson'}">
                      <Button
                        variant="outline"
                        @click="createLesson(className, weekDay, timeValues[id])"
                      >
                        Создать урок
                      </Button>
                    </RouterLink>
                  </div>
                </div>
                <div
                  v-else
                  class="text-center"
                >
                  -
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table> 
    </div>
    <div />
  </div>
</template>