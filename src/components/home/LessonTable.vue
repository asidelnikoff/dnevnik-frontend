<script setup lang='ts'>
import { ref } from 'vue'

import { onMounted } from 'vue'
import { lessonTableColumns, type Lesson } from './lessonTableColumns'
import DataTable from './DataTable.vue'

const data = ref<Lesson[]>([])

async function getData(): Promise<Lesson[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      time: '8:00',
      subject: 'Биология',
      teacherFullName: 'Петров Петр Петрович',
      homework: 'Таблица'
    },
    {
      id: '728ed52e',
      time: '9:00',
      subject: 'Биология',
      teacherFullName: 'Петров Петр Петрович',
      homework: 'Таблица'
    },
    {
      id: '728ed52r',
      time: '10:00',
      subject: 'Биология',
      teacherFullName: 'Петров Петр Петрович',
      homework: 'Таблица'
    },
    {
      id: '728ed52m',
      time: '11:10',
      subject: 'Химия',
      teacherFullName: 'Петров Петр Петрович',
      homework: 'Таблица'
    },
    {
      id: '728ed52l',
      time: '12:10',
      subject: 'Химия',
      teacherFullName: 'Петров Петр Петрович',
      homework: 'Таблица'
    },
    {
      id: '728ed52n',
      time: '13:10',
      subject: 'Химия',
      teacherFullName: 'Петров Петр Петрович',
      homework: 'Таблица'
    },
    // ...
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div
    class="rounded-md border h-fit"
  >
    <DataTable
      :columns="lessonTableColumns"
      :data="data"
    />
  </div>
</template>