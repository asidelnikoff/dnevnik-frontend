<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth'
import { MoreHorizontal } from 'lucide-vue-next'
import { computed } from 'vue'

const authStore = useAuthStore()
const hasRights = computed(() => {
  return authStore.isTeacher || authStore.isHeadteacher
})
</script>

<template>
  <DropdownMenu v-if="hasRights">
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="w-8 h-8 p-0"
      >
        <span class="sr-only">Открыть меню</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        Выставить оценку
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Создать домашнее задание
      </DropdownMenuItem>
      <DropdownMenuItem>
        Редактировать домашнее задание
      </DropdownMenuItem>
      <DropdownMenuItem>
        Удалить домашнее задание
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>