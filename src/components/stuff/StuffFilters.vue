<script setup lang='ts'>
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Button from '@/components/ui/button/Button.vue';

import { X } from 'lucide-vue-next';
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
import { subjectSelectValues } from '@/utils/selectValues';

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

const subject = defineModel<string>('subject')
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-3 w-full mb-3">
      <div>
        <Label
          class="mb-1"
          for="search"
        >Фамилия</Label>
        <Input
          id="search"
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
          id="search"
          type="text"
          placeholder="Введите имя"
          @input="(event: Event) => debouncedUpdateFirstName((event.target as HTMLInputElement).value)"
        />
      </div>
      <div>
        <Label
          class="mb-1"
          for="search"
        >Отчество</Label>
        <Input
          id="search"
          type="text"
          placeholder="Введите отчество"
          @input="(event: Event) => debouncedUpdateMiddleName((event.target as HTMLInputElement).value)"
        />
      </div>
      <div>
        <Label class="mb-1">Предмет</Label>
        <div class="relative">
          <Select
            v-model="subject"
          >
            <SelectTrigger>
              <SelectValue placeholder="Все" />
            </SelectTrigger>
            <SelectContent class="max-h-48">
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
          <button
            v-if="subject !== ''"
            type="button"
            class="absolute -right-5 top-0 h-full flex items-center justify-center"
            @click="subject = ''"
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