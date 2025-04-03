<script setup lang="ts">
import router from '@/router'

import { useAuthStore } from '@/stores/auth'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

//
// Form select values
//

const roleSelectValues = [
  {
    value: 'student',
    label: 'Ученик',
  },
  {
    value: 'headteacher',
    label: 'Заведующий учебной частью',
  },
  {
    value: 'teacher',
    label: 'Учитель',
  },
]

const classSelectValues = [
  {
    value: '1a',
    label: '1А',
  },
  {
    value: '10b',
    label: '10Б',
  },
]

const subjectSelectValues = [
  {
    value: 'russian',
    label: 'Русский язык',
  },
  {
    value: 'math',
    label: 'Математика',
  },
];

//
// Form schema and validations
//

const formSchema = toTypedSchema(z.object({
  name: z.string({ message: 'Введите фамилию'}),
  lastName: z.string({ message: 'Введите имя'}),
  middleName: z.string().optional(),
  position: z.string({ message: 'Выберите должность'}).default(roleSelectValues[0].value),
  class: z.string({ message: 'Выберите класс'}).default(classSelectValues[0].value),
  subject: z.string({ message: 'Выберите предмет'}).default(subjectSelectValues[0].value),
}))
const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

//
// Submit action
//

const authStore = useAuthStore()
const onSubmit = form.handleSubmit((values) => {
  if (authStore.register()) {
    router.replace({ name: 'home' })
  }
  console.log(values)
})
</script>

<template>
  <form
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <div class="flex gap-5">
      <FormField
        v-slot="{ componentField }"
        name="lastName"
      >
        <FormItem>
          <FormLabel><span>Фамилия<sup>*</sup></span></FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="name"
      >
        <FormItem>
          <FormLabel><span>Имя<sup>*</sup></span></FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="middleName"
      >
        <FormItem>
          <FormLabel>Отчество</FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex gap-5">
      <FormField
        v-slot="{ componentField }"
        name="position"
      >
        <FormItem>
          <FormLabel><span>Должность<sup>*</sup></span></FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="{ value, label} in roleSelectValues"
                  :key="value"
                  :value="value"
                >
                  {{ label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-if="form.controlledValues.value.position === 'student'"
        v-slot="{ componentField }"
        name="class"
      >
        <FormItem>
          <FormLabel><span>Класс<sup>*</sup></span></FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
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
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-if="form.controlledValues.value.position !== 'student'"
        v-slot="{ componentField }"
        name="subject"
      >
        <FormItem>
          <FormLabel><span>Предмет<sup>*</sup></span></FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="{ value, label} in subjectSelectValues"
                  :key="value"
                  :value="value"
                >
                  {{ label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <Button
      class="mt-15 ml-auto"
      type="submit"
    >
      Сохранить
    </Button>
  </form>
</template>