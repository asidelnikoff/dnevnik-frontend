<script setup lang='ts'>
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { X } from 'lucide-vue-next';

import Button from '@/components/ui/button/Button.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Funnel } from 'lucide-vue-next'
import { useDebounceFn } from '@vueuse/core';
import { classSelectValues } from '@/utils/selectValues';

const lastName = defineModel<string>('lastName')
const debouncedUpdateLastName = useDebounceFn((value: string) => {
  lastName.value = value
}, 1000)
const firstName = defineModel<string>('firstName')
const debouncedUpdateFirstName = useDebounceFn((value: string) => {
  firstName.value = value
}, 1000)
const middleName = defineModel<string>('middleName')
const debouncedUpdateMiddleName = useDebounceFn((value: string) => {
  middleName.value = value
}, 1000)

const className = defineModel<string>('className')
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-3 w-full mb-3">
      <div>
        <Label
          class="mb-1"
          for="lastName"
        >Фамилия</Label>
        <Input
          id="lastName"
          type="text"
          placeholder="Введите фамилию"
          @input="(event: Event) => debouncedUpdateLastName((event.target as HTMLInputElement).value)"
        />
      </div>
      <div>
        <Label
          class="mb-1"
          for="search"
        >Имя</Label>
        <Input
          id="firstName"
          type="firstName"
          placeholder="Введите имя"
          @input="(event: Event) => debouncedUpdateFirstName((event.target as HTMLInputElement).value)"
        />
      </div>
      <div>
        <Label
          class="mb-1"
          for="middleName"
        >Отчество</Label>
        <Input
          id="middleName"
          type="text"
          placeholder="Введите отчество"
          @input="(event: Event) => debouncedUpdateMiddleName((event.target as HTMLInputElement).value)"
        />
      </div>
      <div>
        <Label
          class="mb-1"
          for="middleName"
        >Класс</Label>
        <div class="relative">
          <Select
            v-model="className"
          >
            <SelectTrigger>
              <SelectValue placeholder="Все" />
            </SelectTrigger>
            <SelectContent class="max-h-48">
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
          <button
            v-if="className !== ''"
            type="button"
            class="absolute -right-5 top-0 h-full flex items-center justify-center"
            @click="className = ''"
          >
            <X
              class="size-4 text-muted-foreground hover:text-foreground transition-colors"
            />
          </button>
        </div>
      </div>
    </div>
    <Button
      class="rounded-full"
      variant="ghost"
      size="icon"
    >
      <Funnel 
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
      />
      <span class="sr-only">Фильтр</span>
    </Button>
  </div>
</template>