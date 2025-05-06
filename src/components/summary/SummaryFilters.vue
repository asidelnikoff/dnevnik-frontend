<script setup lang='ts'>
import { Label } from '@/components/ui/label'

import { Funnel } from 'lucide-vue-next'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { getDateString } from '@/utils/dateHelper'
import type { DateRange } from 'reka-ui'
import { getLocalTimeZone } from '@internationalized/date'
import { classSelectValues } from '@/utils/selectValues'

const date = defineModel<DateRange>('date', { required: true })
const classes = defineModel<string[]>('classes', { required: true })
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-3 w-full max-w-sm mb-3">
      <div class="flex flex-col gap-1">
        <Label>Дата</Label>
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
      </div>
      <div class="flex flex-col gap-1">
        <Label>Классы</Label>
        <Select
          v-model="classes"
          multiple
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Все" />
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
      </div>
    </div>
    <Button
      class="rounded-full"
      variant="ghost"
      size="icon"
    >
      <Funnel 
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
      />
      <span class="sr-only">Фильтр</span>
    </Button>
  </div>
</template>