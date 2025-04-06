<script setup lang='ts'>
import CalendarFilter from '@/components/home/CalendarFilter.vue';
import ScheduleTable from '@/components/home/ScheduleTable.vue';
import UserGreeting from '@/components/home/UserGreeting.vue';
</script>

<template>
  <div class="flex flex-col gap-10 w-fit">
    <UserGreeting />
    <div class="flex gap-10">
      <ScheduleTable />
      <CalendarFilter />
    </div>
  </div>
</template>