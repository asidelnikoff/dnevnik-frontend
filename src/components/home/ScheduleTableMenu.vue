<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Label from '@/components/ui/label/Label.vue'
import Input from '@/components/ui/input/Input.vue'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth'
import { MoreHorizontal } from 'lucide-vue-next'
import { computed, ref, type PropType } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import { toast } from 'vue-sonner'

import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectGroup from '@/components/ui/select/SelectGroup.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { classSelectValues } from '@/utils/selectValues'
import { useRouter } from 'vue-router'
import type { GetScheduleResponse } from '@/api/services/scheduleService'

const scheduleStore = useScheduleStore()

const props = defineProps({
  scheduleItem: {
    type: Object as PropType<GetScheduleResponse[number]>,
    required: true,
  }
})

const authStore = useAuthStore()
const hasRights = computed(() => {
  return authStore.isTeacher || authStore.isHeadteacher
})

const router = useRouter()
function goToGrades() {
  router.push({
    name: 'grades',
    params: {
      id: props.scheduleItem.id
    }
  })
}

const isDeleteDialogOpen = ref(false)
async function handleDeleteHomework() {
  try {
    await scheduleStore.deleteScheduleHomework(props.scheduleItem.id)
    toast('Домашнее задание удалено')
    isDeleteDialogOpen.value = false
  } catch {
    toast('Не удалось удалить домашнее задание')
  }
}

const isEditDialogOpen = ref(false)
const homework = ref<string>(props.scheduleItem.homework || '')
async function handleUpdateHomework() {
  try {
    await scheduleStore.updateScheduleHomework(props.scheduleItem.id, {
      homework: homework.value
    })
    toast('Домашнее задание обновлено')
  } catch {
    toast('Не удалось обновить домашнее задание')
  }
}
</script>

<template>
  <DropdownMenu
    v-if="hasRights"
  >
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
      <DropdownMenuItem @click="goToGrades">
        Выставить оценку
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-if="!scheduleItem.homework"
        @click="isEditDialogOpen = true"
      >
        Создать домашнее задание
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="scheduleItem.homework"
        @click="isEditDialogOpen = true"
      >
        Редактировать домашнее задание
      </DropdownMenuItem>

      <DropdownMenuItem
        v-if="scheduleItem.homework"
        @click="isDeleteDialogOpen = true"
      >
        Удалить домашнее задание
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <AlertDialog v-model:open="isDeleteDialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Удалить д/з?</AlertDialogTitle>
        <AlertDialogDescription>
          <div>Вы действительно хотите <b>удалить</b> домашнее задание?</div>
          <div><b>Класс:</b> {{ scheduleItem.class }}</div>
          <div><b>Урок:</b> {{ scheduleItem.subject }}</div>
          <div><b>Дата:</b> {{ scheduleStore.date }}</div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
        <AlertDialogAction @click="handleDeleteHomework">
          Удалить
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent> 
  </AlertDialog>

  <Dialog v-model:open="isEditDialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Домашнее задание</DialogTitle>
      </DialogHeader>

      <div class="flex gap-5">
        <div class="flex flex-1/2 flex-col gap-2">
          <Label for="subject">Предмет</Label>
          <Input
            id="subject"
            :model-value="scheduleItem.subject"
            disabled
            type="text"
          />
        </div>

        <div class="flex flex-1/2 flex-col gap-2">
          <Label for="date">Дата</Label>
          <Input
            id="date"
            :model-value="scheduleStore.date"
            disabled
            type="text"
          />
        </div>

        <div class="flex flex-col gap-2">
          <Label>Класс</Label>
          <Select
            disabled
            :model-value="scheduleItem.class"
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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

      <div class="flex flex-col gap-2">
        <Label>Задание</Label>
        <Textarea
          v-model="homework"
          class="resize-none break-all"
        />
      </div>

      <DialogFooter>
        <Button @click="handleUpdateHomework">
          Сохранить
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>