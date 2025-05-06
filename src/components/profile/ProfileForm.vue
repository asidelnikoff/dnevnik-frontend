<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import AButton from '@/components/common/AButton.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import { ref } from 'vue'
import PasswordInput from '../common/PasswordInput.vue'
//
// Form schema and validation
//
const formSchema = toTypedSchema(z.object({
  old_password: z.string({ message: 'Введите текущий пароль'}),
  new_login: z.string().optional(),
  new_password: z.string().optional(),
  new_password_confirm: z.string().optional(),
})
.refine((data) => data.new_password === data.new_password_confirm, {
  message: "Пароли не совпадают",
    path: ["new_password_confirm"],
})
.refine(data => data.new_login || data.new_password, {
  message: "Необходимо указать новый логин или новый пароль",
  path: ["new_login"],
}))
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    old_password: undefined,
  }
})
//
// Submit action
//
const loading = ref(false)
const authStore = useAuthStore()
const onSubmit = form.handleSubmit(async (values) => {
  const params = values
  loading.value = true;
  try {
    await authStore.updatePassword(params)
    toast('Данные успешно обновлены')
  } catch {
    toast('Не удалось обновить данные')
  }
  loading.value = false;
})
</script>

<template>
  <form
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <div class="flex gap-5">
      <FormField
        name="last_name"
      >
        <FormItem>
          <FormLabel><span>Фамилия</span></FormLabel>
          <FormControl>
            <Input
              type="text"
              disabled
              :model-value="authStore.getLastName"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        name="first_name"
      >
        <FormItem>
          <FormLabel><span>Имя</span></FormLabel>
          <FormControl>
            <Input
              type="text"
              disabled
              :model-value="authStore.getName"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        name="middle_name"
      >
        <FormItem>
          <FormLabel>Отчество</FormLabel>
          <FormControl>
            <Input
              type="text"
              disabled
              :model-value="authStore.getMiddleName"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <FormField
      v-slot="{ componentField }"
      name="old_password"
    >
      <FormItem>
        <FormLabel><span>Текущий пароль<sup>*</sup></span></FormLabel>
        <FormControl>
          <PasswordInput v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="new_login"
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
          name="new_password"
        >
          <FormItem>
            <FormLabel><span>Новый пароль<sup>*</sup></span></FormLabel>
            <FormControl>
              <PasswordInput v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="flex-1/2">
        <FormField
          v-slot="{ componentField }"
          name="new_password_confirm"
          class="flex-1/2"
        >
          <FormItem>
            <FormLabel>Повтор пароля</FormLabel>
            <FormControl>
              <PasswordInput v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <AButton
      class="mt-15 ml-auto"
      type="submit"
      :loading
    >
      Сохранить
    </AButton>
  </form>
</template>