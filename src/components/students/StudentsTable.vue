<script setup lang='ts'>
import type { PropType } from 'vue';

import Button from '@/components/ui/button/Button.vue';
import { Trash2 } from 'lucide-vue-next';

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

import { useStudentsStore } from '@/stores/students';
import { useAuthStore } from '@/stores/auth';
import type { GetStudentsResponse } from '@/api/services/usersService';
import { toast } from 'vue-sonner';

const studentsStore = useStudentsStore()
const authStore = useAuthStore()
defineProps({
  students: {
    type: Array as PropType<GetStudentsResponse>,
    required: true,
  }
})

async function deleteStudent(id: string): Promise<void> {
  try {
    await studentsStore.deleteStudent(id)
    toast('Ученик успешно удален')
  } catch {
    toast('Не удалось удалить ученика')
  }
}
</script>
<template>
  <div
    v-if="students.length === 0"
    class="mt-1 text-center"
  >
    Ученики отсутствуют
  </div>
  <Table v-else>
    <TableHeader class="w-full">
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Фамилия Имя Отчество</TableHead>
        <TableHead>Класс</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody
      class="w-full"
    >
      <TableRow
        v-for="(student, id) in students"
        :key="student.id"
        class="h-12"
      >
        <TableCell> {{ id + 1 }} </TableCell>
        <TableCell>{{ student.full_name }}</TableCell>
        <TableCell>{{ student.class }}</TableCell>
        <TableCell
          v-if="authStore.isHeadteacher"
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
                <AlertDialogTitle>Удалить ученика?</AlertDialogTitle>
                <AlertDialogDescription>
                  <div>Вы действительно хотите <b>удалить</b> ученика?</div>
                  <br>
                  <div><b>ФИО: </b>{{ student.full_name }}</div>
                  <div><b>Класс: </b>{{ student.class }}</div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction
                  @click="deleteStudent(student.id)"
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