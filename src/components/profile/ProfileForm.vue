<script setup lang="ts">
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
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'
//
// Form schema and validation
//
const authStore = useAuthStore()
const formSchema = toTypedSchema(z.object({
  lastName: z.string().optional(),
  name: z.string().optional(),
  middleName: z.string().optional(),
  oldPassword: z.string({ message: 'Введите текущий пароль'}),
  newLogin: z.string().optional(),
  newPassword: z.string().optional(),
  newPasswordConfirm: z.string().optional(),
})
.refine((data) => data.newPassword === data.newPasswordConfirm, {
  message: "Пароли не совпадают",
    path: ["newPasswordConfirm"],
})
.refine(data => data.newLogin || data.newPassword, {
  message: "Необходимо указать новый логин или новый пароль",
  path: ["newLogin"],
}))
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    oldPassword: undefined,
    lastName: authStore.getLastName,
    name: authStore.getName,
    middleName: authStore.getMiddleName,
  }
})
//
// Submit action
//
const onSubmit = form.handleSubmit((values) => {
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
          <FormLabel><span>Фамилия</span></FormLabel>
          <FormControl>
            <Input
              type="text"
              disabled
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
          <FormLabel><span>Имя</span></FormLabel>
          <FormControl>
            <Input
              type="text"
              disabled
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
              disabled
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <FormField
      v-slot="{ componentField }"
      name="oldPassword"
    >
      <FormItem>
        <FormLabel><span>Текущий пароль<sup>*</sup></span></FormLabel>
        <FormControl>
          <Input
            type="password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="newLogin"
    >
      <FormItem>
        <FormLabel><span>Новый логин<sup>*</sup></span></FormLabel>
        <FormControl>
          <Input
            type="text"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex gap-5">
      <div class="flex-1/2">
        <FormField
          v-slot="{ componentField }"
          name="newPassword"
        >
          <FormItem>
            <FormLabel><span>Новый пароль<sup>*</sup></span></FormLabel>
            <FormControl>
              <Input
                type="password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="flex-1/2">
        <FormField
          v-slot="{ componentField }"
          name="newPasswordConfirm"
          class="flex-1/2"
        >
          <FormItem>
            <FormLabel>Повтор пароля</FormLabel>
            <FormControl>
              <Input
                type="password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <Button
      class="mt-15 ml-auto"
      type="submit"
    >
      Сохранить
    </Button>
  </form>
</template>