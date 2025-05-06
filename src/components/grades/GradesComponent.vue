<script setup lang='ts'>
import type { Grade } from '@/api/types/shedule';
import Button from '@/components/ui/button/Button.vue';
import { CirclePlus, Pencil, Trash2 } from 'lucide-vue-next';
import { onBeforeMount, ref, type PropType } from 'vue';

import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';

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
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import GradeItem from '../home/GradeItem.vue';
import type { GetScheduleGradesResponse, GetScheduleResponse } from '@/api/services/scheduleService';
import { getFullName } from '@/utils/getFullName';
import { useScheduleStore } from '@/stores/schedule';
import { useGradesStore } from '@/stores/grades';
import { gradeSelectValues } from '@/utils/selectValues';

const gradeItem = ref<GetScheduleGradesResponse[number]>()

const props = defineProps({
  studentId: {
    type: String,
    required: true,
  },
  scheduleItem: {
    type: Object as PropType<GetScheduleResponse[number]>,
    required: true,
  }
})

const newGrade = ref<Grade>({
  grade: '5',
  comment: ''
})

const isAddDialogOpen = ref(false)
async function addGrade(studentId: string): Promise<void> {
  gradesStore.addGrade(studentId, {
    grade: newGrade.value.grade,
    comment: newGrade.value.comment,
  })
  newGrade.value.grade = 5
  newGrade.value.comment = ''
}

const isEditDialogOpen = ref(false)
const editedGradeId = ref<number>()
function editGrade(grade: Grade, gradeId: number): void {
  newGrade.value.grade = grade.grade
  newGrade.value.comment = grade.comment
  editedGradeId.value = gradeId
}
function updateGrade(studentId: string): void {
  gradesStore.updateGrade(studentId, editedGradeId.value as number, {
    grade: newGrade.value.grade,
    comment: newGrade.value.comment
  })
  newGrade.value.grade = 5
  newGrade.value.comment = ''
}

onBeforeMount(() => {
  gradeItem.value = gradesStore.findGradeItemByStudentId(props.studentId)
})

const scheduleStore = useScheduleStore()
const gradesStore = useGradesStore()
</script>

<template>
  <div class="flex gap-3">
    <div
      v-for="(grade, gradeId) in gradeItem?.grades"
      :key="grade.grade + grade.comment"
      class="flex items-center border rounded-md pl-1"
    >
      <GradeItem
        :grade="{
          grade: grade.grade,
          comment: ''
        }"
      />
      <div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          @click="editGrade(grade, gradeId); isEditDialogOpen = true"
        >
          <Pencil class="w-4 h-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              type="button"
              variant="ghost"
              size="icon"
            >
              <Trash2 class="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Удалить оценку?</AlertDialogTitle>
              <AlertDialogDescription>
                <div>Вы действительно хотите <b>удалить</b> оценку?</div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction @click="gradesStore.deleteGrade(gradeItem?.student.id as string, gradeId)">
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent> 
        </AlertDialog>
      </div>
    </div>

    <Dialog v-model:open="isEditDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оценка</DialogTitle>
        </DialogHeader>

        <div class="flex gap-5">
          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="subject">Ученик</Label>
            <Input
              id="subject"
              :model-value="getFullName(gradeItem!.student)"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Урок</Label>
            <Input
              id="date"
              :model-value="scheduleItem.subject"
              disabled
              type="text"
            />
          </div>
        </div>

        <div class="flex gap-5">
          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Класс</Label>
            <Input
              id="date"
              :model-value="scheduleItem.class"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Дата</Label>
            <Input
              id="date"
              :model-value="scheduleStore.getDate"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Оценка</Label>
            <Select
              v-model="newGrade.grade"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="{ value, label} in gradeSelectValues"
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

        <div class="flex flex-1/2 flex-col gap-2">
          <Label>Комментарий</Label>
          <Textarea
            v-model="newGrade.comment"
            class="resize-none break-all"
          />
        </div>

        <div class="ml-auto w-fit mt-2">
          <Button @click="updateGrade(gradeItem!.student.id); isEditDialogOpen = false">
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="isAddDialogOpen">
      <DialogTrigger>
        <Button
          type="button"
          variant="outline"
          size="icon"
        >
          <CirclePlus class="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оценка</DialogTitle>
        </DialogHeader>

        <div class="flex gap-5">
          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="subject">Ученик</Label>
            <Input
              id="subject"
              :model-value="getFullName(gradeItem!.student)"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Урок</Label>
            <Input
              id="date"
              :model-value="scheduleItem.subject"
              disabled
              type="text"
            />
          </div>
        </div>

        <div class="flex gap-5">
          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Класс</Label>
            <Input
              id="date"
              :model-value="scheduleItem.class"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Дата</Label>
            <Input
              id="date"
              :model-value="scheduleStore.getDate"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Оценка</Label>
            <Select
              v-model="newGrade.grade"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="{ value, label} in gradeSelectValues"
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

        <div class="flex flex-1/2 flex-col gap-2">
          <Label>Комментарий</Label>
          <Textarea
            v-model="newGrade.comment"
            class="resize-none break-all"
          />
        </div>

        <div class="ml-auto w-fit mt-2">
          <Button @click="addGrade(gradeItem!.student.id); isAddDialogOpen = false">
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>