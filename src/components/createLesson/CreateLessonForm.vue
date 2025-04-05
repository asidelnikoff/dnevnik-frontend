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
//
// Date
//
import type { DateRange } from 'reka-ui'
import { cn } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type Ref, ref } from 'vue'
import { useSummaryStore } from '@/stores/summary'

const df = new DateFormatter('ru-RU', {
  dateStyle: 'short',
})

const today = new Date(Date.now())
const date = ref({
  start: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()),
  end: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()).add({ days: 1 }),
}) as Ref<DateRange>
//
// Form select values
//
import { subjectSelectValues } from '@/utils/selectValues'
import { classSelectValues } from '@/utils/selectValues'
import { timeSelectValues } from '@/utils/selectValues'
import { daysSelectValues } from '@/utils/selectValues'
//
// Form schema and validations
//
const formSchema = toTypedSchema(z.object({
  subject: z.string().default(subjectSelectValues[0].value),
  class: z.string().default(classSelectValues[0].value),
  time: z.string().default(timeSelectValues[0].value),

  days: z.string().array().nonempty({ message: 'Выберите дни недели'}).default([daysSelectValues[0].value]),
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
  if (summaryStore.createLesson({
    ...values,
    startDate: date.value.start?.toString() || '',
    endDate: date.value.end?.toString() || '',
  })) {
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

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
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
        name="time"
      >
        <FormItem>
          <FormLabel><span>Время<sup>*</sup></span></FormLabel>

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
                  v-for="{ value, label} in timeSelectValues"
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
        name="days"
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
                    {{ df.format(date.start.toDate(getLocalTimeZone())) }} - {{ df.format(date.end.toDate(getLocalTimeZone())) }}
                  </template>

                  <template v-else>
                    {{ df.format(date.start.toDate(getLocalTimeZone())) }}
                  </template>
                </template>
                <template v-else>
                  Pick a date
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