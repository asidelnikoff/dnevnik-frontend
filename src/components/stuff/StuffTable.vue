<script setup lang='ts'>
import { type PropType } from 'vue'

import RoleBadge from './RoleBadge.vue'

import Button from '@/components/ui/button/Button.vue'
import { Trash2 } from 'lucide-vue-next'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuthStore } from '@/stores/auth'
import { useStuffStore } from '@/stores/stuff'
import type { GetStuffResponse } from '@/api/services/usersService'
import { toast } from 'vue-sonner'

const authStore = useAuthStore()
const stuffStore = useStuffStore()
defineProps({
  stuff: {
    type: Array as PropType<GetStuffResponse>,
    required: true,
  }
})

async function deleteTeacher(id: string): Promise<void> {
 try {
  await stuffStore.deleteTeacher(id)
  toast('Учитель успешно удален')
 } catch {
  toast('Не удалось удалить учителя')
 }
}
</script>
<template>
  <div
    v-if="stuff.length === 0"
    class="mt-1 text-center"
  >
    Сотрудники отсутствуют
  </div>
  <Table v-else>
    <TableHeader class="w-full">
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Фамилия Имя Отчество</TableHead>
        <TableHead>Урок</TableHead>
        <TableHead>Должность</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody class="w-full">
      <TableRow
        v-for="(stuffMember, id) in stuff"
        :key="stuffMember.id"
        class="h-12"
      >
        <TableCell> {{ id + 1 }} </TableCell>
        <TableCell>{{ stuffMember.full_name }}</TableCell>
        <TableCell>{{ stuffMember.subject }}</TableCell>
        <TableCell><RoleBadge :role="stuffMember.role" /></TableCell>
        <TableCell
          class="w-4"
        >
          <AlertDialog 
            v-if="authStore.isHeadteacher && stuffMember.role !== 'headteacher'"
          >
            <AlertDialogTrigger>
              <Button
                class="rounded-full"
                type="button"
                variant="ghost"
                size="icon"
              >
                <Trash2
                  class="w-4 h-4"
                />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить учителя?</AlertDialogTitle>
                <AlertDialogDescription>
                  <div>Вы действительно хотите <b>удалить</b> учителя?</div>
                  <br>
                  <div><b>ФИО: </b>{{ stuffMember.full_name }}</div>
                  <div><b>Урок: </b>{{ stuffMember.subject }}</div>
                  <div><b>Должность: </b>{{ stuffMember.role === 'teacher' ? 'Учитель' : 'Заведующий учебной частью' }}</div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction
                  @click="deleteTeacher(stuffMember.id)"
                >
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent> 
          </AlertDialog>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table> 
</template>