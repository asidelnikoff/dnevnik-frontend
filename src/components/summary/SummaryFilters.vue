<script setup lang='ts'>
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Funnel } from 'lucide-vue-next'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'


const df = new DateFormatter('ru-RU', {
  dateStyle: 'short',
})

import { timeSelectValues } from '@/utils/selectValues'
const time = ref(timeSelectValues[0].value)

const date = ref<DateValue>()
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-3 w-full max-w-sm mb-3">
      <div class="flex flex-col gap-1">
        <Label
          class="mb-1"
          for="date"
        >Дата</Label>
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
              {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Выберите дату" }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model="date"
              locale="ru"
              initial-focus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div class="flex flex-col gap-1">
        <Label
          class="mb-1"
          for="search"
        >Время</Label>
        <Select v-model="time">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
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
</template>v-model="value