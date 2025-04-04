<script setup lang='ts'>
import { onBeforeMount } from 'vue'

import { useStuffStore } from '@/stores/stuff'

import type { Stuff } from '@/api/types/stuff'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const stuffStore = useStuffStore()
onBeforeMount(() => {
  stuffStore.getStuff()
})

function getStuffFullName(stuff: Stuff): string {
  let result = `${stuff.lastName} ${stuff.name}`
  if (stuff.middleName) {
    result += ' ' + stuff.middleName
  }
  return result;
}

function getStuffSubjectsList(stuff: Stuff): string {
  return stuff.subjects.join(', ');
}
</script>
<template>
  <Table>
    <TableHeader class="w-full">
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Фамилия Имя Отчество</TableHead>
        <TableHead>Урок</TableHead>
        <TableHead>Должность</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody class="w-full">
      <TableRow
        v-for="stuff in stuffStore.stuff"
        :key="stuff.id"
      >
        <TableCell> {{ stuff.id }} </TableCell>
        <TableCell>{{ getStuffFullName(stuff) }}</TableCell>
        <TableCell>{{ getStuffSubjectsList(stuff) }}</TableCell>
        <TableCell>{{ stuff.role }}</TableCell>
      </TableRow>
    </TableBody>
  </Table> 
</template>