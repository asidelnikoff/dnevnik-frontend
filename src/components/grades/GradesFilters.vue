<script setup lang="ts">
import Label from '@/components/ui/label/Label.vue'
import { Input } from '@/components/ui/input'
//
// Form select values
//
import type { ScheduleExtended } from '@/api/types/shedule'
import { type PropType } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import { Search } from 'lucide-vue-next'
//
// Form schema and validations
//
const scheduleStore = useScheduleStore()
defineProps({
  gradeItem: {
    type: Object as PropType<ScheduleExtended>,
    required: true,
  }
})
</script>

<template>
  <form
    class="flex flex-col gap-3"
  >
    <div class="flex gap-5">
      <div class="flex flex-col gap-2">
        <Label>Урок</Label>
        <Input
          type="text"
          :model-value="gradeItem.subject"
          disabled
        />
      </div>

      <div class="flex flex-col gap-2">
        <Label>Дата</Label>
        <Input
          type="text"
          :model-value="scheduleStore.date"
          disabled
        />
      </div>

      <div class="flex flex-col gap-2">
        <Label>Класс</Label>
        <Input
          type="text"
          :model-value="gradeItem.class"
          disabled
        />
      </div>
    </div>

    <div class="flex flex-col gap-2 w-full">
      <Label for="terms">Поиск</Label>
      <div class="relative w-full rounded-md border items-center">
        <Input
          class="border-none pl-10"
          placeholder="Введите ФИО"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
    </div>
  </form>
</template>