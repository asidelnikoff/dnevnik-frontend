<script setup lang='ts'>
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Button from '@/components/ui/button/Button.vue';

import { Funnel } from 'lucide-vue-next'

const search = defineModel<string>('search')
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="w-full max-w-sm mb-3">
      <Label
        class="mb-1"
        for="search"
      >Поиск</Label>
      <Input
        id="search"
        v-model="search"
        type="text"
        placeholder="Введите ФИО"
      />
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