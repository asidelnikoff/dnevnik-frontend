<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

defineProps({
  homework: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>
      <div class="max-w-[10ch] overflow-hidden whitespace-nowrap text-ellipsis hover:underline cursor-pointer transition-all duration-200">
        {{ homework }}
      </div>
    </HoverCardTrigger>
    <HoverCardContent>
      <p><i>Домашнее задание:</i></p>
      {{ homework }}
    </HoverCardContent>
  </HoverCard>
</template>