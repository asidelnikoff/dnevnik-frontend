<script setup lang='ts'>
import { type PropType } from 'vue';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

import type { Grade } from '@/api/types/shedule';

defineProps({
  grade: {
    type: Object as PropType<Grade>,
    required: true,
  }
})

const gradeColors: Record<string, string> = {
  2: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  3: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  4: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  5: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
}
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>
      <div
        :class="gradeColors[grade.grade]"
        class="px-2 py-1 rounded cursor-pointer hover:brightness-95 dark:hover:brightness-110 transition-all duration-200"
      >
        {{ grade.grade }}
      </div>
    </HoverCardTrigger>
    <HoverCardContent>
      <p><i>Комментарий к оценке:</i></p>
      {{ grade.comment || '' }}
    </HoverCardContent>
  </HoverCard>
</template>