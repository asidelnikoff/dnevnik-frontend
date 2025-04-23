<script setup lang="ts">
import router from '@/router'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useStuffStore } from '@/stores/stuff'

import { RefreshCcw } from 'lucide-vue-next'
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
import { toast } from 'vue-sonner'
//
// Form select values
//
import { roleSelectValues } from '@/utils/selectValues'
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

  role: z.string({ message: 'Выберите должность'}).default(roleSelectValues[0].value),
  subject: z.string({ message: 'Выберите предмет'}),
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
const stuffStore = useStuffStore()
const onSubmit = form.handleSubmit((values) => {
  const params = values
  const response = stuffStore.createTeacher(params)
  if (response.status === 200) {
    toast('Учитель успешно добавлен')
    router.replace({ name: 'stuff' })
    return;
  }
  toast('Не удалось добавить учителя')
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
        name="role"
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
        v-slot="{ componentField }"
        name="subject"
      >
        <FormItem>
          <FormLabel><span>Предмет<sup>*</sup></span></FormLabel>
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

    <Button
      class="mt-15 ml-auto"
      type="submit"
    >
      Создать
    </Button>
  </form>
</template>