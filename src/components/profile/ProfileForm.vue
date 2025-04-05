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
  lastName: z.string().optional().default(authStore.getLastName),
  name: z.string().optional().default(authStore.getName),
  middleName: z.string().optional().default(authStore.getMiddleName),
  login: z.string().optional(),
  password: z.string().optional(),
  passwordConfirm: z.string().optional(),
})
.refine((data) => data.password === data.passwordConfirm, {
  message: "Пароли не совпадают",
    path: ["passwordConfirm"],
}))
const form = useForm({
  validationSchema: formSchema,
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
          <FormLabel><span>Фамилия<sup>*</sup></span></FormLabel>
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
          <FormLabel><span>Имя<sup>*</sup></span></FormLabel>
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
      name="login"
    >
      <FormItem>
        <FormLabel>Логин</FormLabel>
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
        <FormLabel>Пароль</FormLabel>
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
      name="passwordConfirm"
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

    <Button
      class="mt-15 ml-auto"
      type="submit"
    >
      Сохранить
    </Button>
  </form>
</template>