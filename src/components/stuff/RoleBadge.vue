<script setup lang='ts'>
import { Badge } from '@/components/ui/badge'
import { computed } from 'vue'

const props = defineProps({
  role: {
    type: String,
    required: true
  }
})

const badgeText = computed(() => {
  if (props.role === 'headteacher') {
    return 'Заведующий учебной частью'
  } else {
    return 'Учитель'
  }
})
</script>

<template>
  <Badge :variant="role === 'teacher' ? 'secondary' : 'default'">
    {{ badgeText }}
  </Badge>
</template>