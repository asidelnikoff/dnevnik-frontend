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

import { Input } from '@/components/ui/input'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import { toast } from 'vue-sonner'
//
// Form schema and validations
//
const formSchema = toTypedSchema(z.object({
  login: z.string({ message: 'Введите логин'}),
  password: z.string({ message: 'Введите пароль'}),
  rememberMe: z.boolean().default(false),
}))
const form = useForm({
  validationSchema: formSchema,
})
//
// Submit action
//
const authStore = useAuthStore()
const onSubmit = form.handleSubmit((values) => {
  const loginParams = {
    login: values.login,
    password: values.password
  }
  const response = authStore.login(loginParams, values.rememberMe)
  if (response.status === 200) {
    router.replace({name: 'home'})
    toast('Авторизация прошла успешно')
    return;
  }
  toast('Не удалось авторизоваться')
})
</script>

<template>
  <form
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
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
      v-slot="{ value, handleChange }"
      name="rememberMe"
    >
      <FormItem class="flex items-center gap-3">
        <FormControl>
          <Checkbox
            :model-value="value"
            @update:model-value="handleChange"
          />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Запомнить меня</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <Button
      class="w-100 mt-15"
      type="submit"
    >
      Вход
    </Button>
  </form>
</template>