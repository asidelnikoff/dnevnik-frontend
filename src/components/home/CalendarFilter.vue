<script setup lang='ts'>
import { Calendar } from '@/components/ui/calendar'
import { type DateValue } from '@internationalized/date'

const date = defineModel<DateValue>('date')
</script>

<template>
  <Calendar
    v-model="date"
    locale="ru"
    :weekday-format="'short'"
    class="rounded-md border h-fit"
  />
</template>