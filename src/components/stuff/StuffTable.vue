<script setup lang='ts'>
import { type PropType } from 'vue'

import type { Stuff } from '@/api/types/users'

import { getFullName } from '@/utils/getFullName'
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

const authStore = useAuthStore()
const stuffStore = useStuffStore()
defineProps({
  stuff: {
    type: Array as PropType<Stuff[]>,
    required: true,
  }
})
</script>
<template>
  <Table>
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
        v-for="stuff in stuff"
        :key="stuff.id"
      >
        <TableCell> {{ stuff.id }} </TableCell>
        <TableCell>{{ getFullName(stuff) }}</TableCell>
        <TableCell>{{ stuff.subject }}</TableCell>
        <TableCell>{{ stuff.role }}</TableCell>
        <TableCell
          v-if="authStore.isHeadteacher && stuff.role !== 'Заведующий учебной частью'"
          class="w-4"
        >
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                class="rounded-full"
                type="button"
                variant="ghost"
                size="icon"
              >
                <Trash2 class="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить учителя?</AlertDialogTitle>
                <AlertDialogDescription>
                  <div>Вы действительно хотите <b>удалить</b> учителя?</div>
                  <br>
                  <div><b>ФИО: </b>{{ getFullName(stuff) }}</div>
                  <div><b>Урок: </b>{{ stuff.subject }}</div>
                  <div><b>Должность: </b>{{ stuff.role }}</div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction
                  @click="stuffStore.deleteTeacher({id: stuff.id})"
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