<script setup lang='ts'>
import CalendarFilter from '@/components/home/CalendarFilter.vue';
import LessonTable from '@/components/home/LessonTable.vue';
import Greeting from '@/components/home/UserGreeting.vue';
</script>

<template>
  <div class="flex flex-col gap-3 w-fit">
    <Greeting />
    <div class="flex gap-10">
      <LessonTable />
      <CalendarFilter />
    </div>
  </div>
</template>