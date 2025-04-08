<script setup lang='ts'>
import type { Grade } from '@/api/types/shedule';
import Button from '@/components/ui/button/Button.vue';
import { CirclePlus, Pencil, Trash2 } from 'lucide-vue-next';
import { ref, type PropType } from 'vue';

import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

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

defineProps({
  grades: {
    type: Array as PropType<Grade[]>,
    required: true
  }
})

const isEditDialogOpen = ref(false)
</script>

<template>
  <div class="flex gap-3">
    <div
      v-for="grade in grades"
      :key="grade.grade + grade.comment"
      class="flex items-center border rounded-md pl-4"
    >
      <span>{{ grade.grade }}</span>
      <div class="ml-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          @click="isEditDialogOpen = true"
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
              <AlertDialogAction>
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent> 
        </AlertDialog>
      </div>
    </div>

    <Dialog v-model:open="isEditDialogOpen">
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
              model-value="Test"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Урок</Label>
            <Input
              id="date"
              model-value="test"
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
              model-value="test"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <Label for="date">Дата</Label>
            <Input
              id="date"
              model-value="test"
              disabled
              type="text"
            />
          </div>

          <div class="flex flex-1/2 flex-col gap-2">
            <NumberField
              :default-value="5"
              :min="2"
              :max="5"
            >
              <Label>Оценка</Label>
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </div>
        </div>

        <div class="flex flex-1/2 flex-col gap-2">
          <Label>Задание</Label>
          <Textarea
            class="resize-none break-all"
          />
        </div>

        <div class="ml-auto w-fit mt-2">
          <Button @click="isEditDialogOpen = false">
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>