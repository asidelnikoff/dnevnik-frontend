<script setup lang="ts">
import router from '@/router'

import { toast } from 'vue-sonner'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { transformToApiDate } from '@/utils/tranformToApiDate'

import TeacherCombobox from './TeacherCombobox.vue'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
//
// Date
//
import type { DateRange } from 'reka-ui'
import { cn } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import {
  CalendarDate,
  getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { onBeforeMount, type Ref, ref } from 'vue'
import { useSummaryStore } from '@/stores/summary'

const today = new Date(Date.now())
const date = ref({
  start: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()),
  end: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()).add({ days: 1 }),
}) as Ref<DateRange>
//
// Form select values
//
import { classSelectValues, getEndTimeByStartTime, startTimeSelectValues, subjectSelectValues } from '@/utils/selectValues'
import { daysSelectValues } from '@/utils/selectValues'
import { getDateString } from '@/utils/dateHelper'
//
// Form schema and validations
//
const formSchema = toTypedSchema(z.object({
  subject: z.string().default(subjectSelectValues[0].value),
  class: z.string().default(classSelectValues[0].value),

  start_time: z.string().default(startTimeSelectValues[0].value),

  week_days: z.array(z.string()).nonempty({ message: 'Выберите дни недели'}).default([daysSelectValues[0].value]) as z.ZodTypeAny as z.ZodArray<z.ZodString>,

  teacher_id: z.string({ message: 'Выберите учителя'}),
}))
const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

onBeforeMount(() => {
  const data = summaryStore.getNewLessonData()

  if (data) {
    form.setFieldValue('class', data?.class)
    form.setFieldValue('start_time', data.start_time)
    form.setFieldValue('week_days', data.week_days)
  }
})
//
// Submit action
//
const summaryStore = useSummaryStore()
const onSubmit = form.handleSubmit(async (values) => {
  const params = {
    ...values,

    start_date: transformToApiDate(date.value.start?.toDate(getLocalTimeZone()) as Date),
    end_date: transformToApiDate(date.value.end?.toDate(getLocalTimeZone()) as Date),

    end_time: getEndTimeByStartTime(values.start_time)
  }

  try {
    await summaryStore.createLesson(params)
    toast('Урок успешно создан')
    router.push({ name: 'summary' })
  } catch {
    toast('Не удалось создать урок')
  }
})
</script>

<template>
  <form
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <div class="w-full flex gap-5">
      <FormField
        v-slot="{ componentField }"
        name="subject"
      >
        <FormItem>
          <FormLabel><span>Предмет<sup>*</sup></span></FormLabel>
          <Select
            v-bind="componentField"
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent class="max-h-48">
              <SelectGroup>
                <SelectItem
                  v-for="{ value, label} in subjectSelectValues"
                  :key="value"
                  :value="value"
                >
                  {{ label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="class"
      >
        <FormItem>
          <FormLabel><span>Класс<sup>*</sup></span></FormLabel>

          <Select
            v-bind="componentField"
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent class="max-h-48">
              <SelectGroup>
                <SelectItem
                  v-for="{ value, label} in classSelectValues"
                  :key="value"
                  :value="value"
                >
                  {{ label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="start_time"
      >
        <FormItem>
          <FormLabel><span>Время начала<sup>*</sup></span></FormLabel>
          <Select
            v-bind="componentField"
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="{ value, label} in startTimeSelectValues"
                  :key="value"
                  :value="value"
                >
                  {{ label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex items-center gap-5">
      <FormField
        v-slot="{ componentField }"
        name="week_days"
      >
        <FormItem>
          <FormLabel><span>Дни недели<sup>*</sup></span></FormLabel>

          <Select
            multiple
            v-bind="componentField"
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="{ value, label} in daysSelectValues"
                  :key="value"
                  :value="value"
                >
                  {{ label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="date">
        <FormItem class="flex flex-col">
          <FormLabel>Дата*</FormLabel>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )"
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                <template v-if="date.start">
                  <template v-if="date.end">
                    {{ getDateString(date.start.toDate(getLocalTimeZone())) }} - {{ getDateString(date.end.toDate(getLocalTimeZone())) }}
                  </template>

                  <template v-else>
                    {{ getDateString(date.start.toDate(getLocalTimeZone())) }}
                  </template>
                </template>
                <template v-else>
                  Выберите дату
                </template>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <RangeCalendar
                v-model="date"
                locale="ru"
                :number-of-months="2"
                @update:start-value="(startDate) => date.start = startDate"
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      </FormField>
    </div>

    <FormField name="teacher_id">
      <FormItem>
        <TeacherCombobox @change="(value: string) => form.setFieldValue('teacher_id', value)" />
        <FormMessage />
      </FormItem>
    </FormField>

    <Button
      class="mt-15 ml-auto"
      type="submit"
    >
      Создать
    </Button>
  </form>
</template>