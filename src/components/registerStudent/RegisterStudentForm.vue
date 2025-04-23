<script setup lang="ts">
import router from '@/router'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { RefreshCcw } from 'lucide-vue-next'
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
import { useStudentsStore } from '@/stores/students'
import { toast } from 'vue-sonner'
//
// Form select values
//
import { classSelectValues } from '@/utils/selectValues'
import { generateLogin, generatePassword } from '@/utils/generateRegisterData'
//
// Form schema and validations
//
const formSchema = toTypedSchema(z.object({
  login: z.string({ message: 'Введите логин'}).default(generateLogin()),
  password: z.string({ message: 'Введите пароль'}).default(generatePassword()),

  name: z.string({ message: 'Введите фамилию'}),
  lastName: z.string({ message: 'Введите имя'}),
  middleName: z.string().optional(),

  class: z.string({ message: 'Выберите класс'}).default(classSelectValues[0].value),
}))
const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

function generateRegisterData(): void {
  form.setFieldValue("login", generateLogin())
  form.setFieldValue("password", generatePassword())
}
//
// Submit action
//
const studentsStore = useStudentsStore()
const onSubmit = form.handleSubmit((values) => {
  const params = values
  const response = studentsStore.createStudent(params)
  if (response.status === 200) {
    toast('Ученик успешно добавлен')
    router.replace({ name: 'students' })
  }
  toast('Не удалось добавить ученика')
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
        name="login"
      >
        <FormItem>
          <FormLabel><span>Логин<sup>*</sup></span></FormLabel>
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
        name="password"
      >
        <FormItem>
          <FormLabel><span>Пароль<sup>*</sup></span></FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button
        class="rounded-full mt-auto"
        type="button"
        variant="ghost"
        size="icon"
        @click="generateRegisterData"
      >
        <RefreshCcw class="w-4 h-4" />
      </Button>
    </div>
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
    </div>

    <Button
      class="mt-15 ml-auto"
      type="submit"
    >
      Создать
    </Button>
  </form>
</template>