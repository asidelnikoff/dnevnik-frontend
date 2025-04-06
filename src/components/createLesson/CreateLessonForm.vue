<script setup lang="ts">
import router from '@/router'

import { toast } from 'vue-sonner'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

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
import Input from '@/components/ui/input/Input.vue'
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
import { type Ref, ref } from 'vue'
import { useSummaryStore } from '@/stores/summary'

const today = new Date(Date.now())
const date = ref({
  start: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()),
  end: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()).add({ days: 1 }),
}) as Ref<DateRange>
//
// Form select values
//
import { classSelectValues } from '@/utils/selectValues'
import { daysSelectValues } from '@/utils/selectValues'
import { getDateString } from '@/utils/dateHelper'
//
// Form schema and validations
//
const formSchema = toTypedSchema(z.object({
  subject: z.string({ message: 'Введите предмет'}),
  class: z.string().default(classSelectValues[0].value),

  startTime: z.preprocess(input => `${input}:00`, z.string({message: 'Введите время'}).time({ precision: 0, message: 'Формат - 23:59'})),
  endTime: z.preprocess(input => `${input}:00`, z.string({message: 'Введите время'}).time({ precision: 0, message: 'Формат - 23:59'})),

  weekDays: z.string().array().nonempty({ message: 'Выберите дни недели'}).default([daysSelectValues[0].value]),
}))
const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})
//
// Submit action
//
const summaryStore = useSummaryStore()
const onSubmit = form.handleSubmit((values) => {
  const params = {
    ...values,

    startTime: values.startTime,
    endTime: values.endTime,

    startDate: getDateString(date.value.start?.toDate(getLocalTimeZone()) as Date),
    endDate: getDateString(date.value.end?.toDate(getLocalTimeZone()) as Date),

    teacherId: '1',
  }
  const response = summaryStore.createSchedule(params)
  if (response.status === 200) {
    toast('Урок успешно создан')
    router.push({ name: 'summary' })
    return
  }
  toast('Не удалось создать урок')
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
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
            />
          </FormControl>
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
            <SelectContent>
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
        name="startTime"
      >
        <FormItem>
          <FormLabel><span>Время начала<sup>*</sup></span></FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="endTime"
      >
        <FormItem>
          <FormLabel><span>Время окончания<sup>*</sup></span></FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex items-center gap-5">
      <FormField
        v-slot="{ componentField }"
        name="weekDays"
      >
        <FormItem>
          <FormLabel><span>День недели<sup>*</sup></span></FormLabel>

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

      <FormField name="dob">
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
                  Ввыберите дату
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

    <Button
      class="mt-15 ml-auto"
      type="submit"
    >
      Создать
    </Button>
  </form>
</template>