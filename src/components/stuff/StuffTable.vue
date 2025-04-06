<script setup lang='ts'>
import { onBeforeMount } from 'vue'

import { useStuffStore } from '@/stores/stuff'

import { getFullName } from '@/utils/getFullName'

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
  stuffStore.getStuff({})
})
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
        <TableCell>{{ getFullName(stuff) }}</TableCell>
        <TableCell>{{ stuff.subject }}</TableCell>
        <TableCell>{{ stuff.role }}</TableCell>
      </TableRow>
    </TableBody>
  </Table> 
</template>