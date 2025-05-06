<script setup lang='ts'>
import { onBeforeMount, ref, watch } from 'vue';


import { useAuthStore } from '@/stores/auth';
import { useStuffStore } from '@/stores/stuff';

import type { GetStuffParams } from '@/api/services/usersService';

import { Button } from '@/components/ui/button'

import StuffFilters from '@/components/stuff/StuffFilters.vue';
import StuffTable from '@/components/stuff/StuffTable.vue';
import { toast } from 'vue-sonner';
import ListSkeleton from '@/components/common/ListSkeleton.vue';

const authStore = useAuthStore()

const params = ref<GetStuffParams>({
  firstName: '',
  lastName: '',
  middleName: '',
  subject: ''
})
watch(params, () => {
  getStuff();
}, {
  deep: true
})

const stuffStore = useStuffStore()
const isLoading = ref(false)
async function getStuff() {
  isLoading.value = true
  try {
    await stuffStore.getStuff(params.value)
  } catch {
    toast('Не удалось получить список сотрудников')
  }
  isLoading.value = false
}

onBeforeMount(() => {
  getStuff()
})
</script>

<template>
  <div class="min-w-6/10">
    <StuffFilters
      v-model:first-name="params.firstName"
      v-model:last-name="params.lastName"
      v-model:middle-name="params.middleName"
      v-model:subject="params.subject"
    />

    <ListSkeleton v-if="isLoading" />
    <StuffTable
      v-else
      :stuff="stuffStore.stuff"
    />

    <div
      v-if="authStore.isHeadteacher"
      class="w-fit mt-3 ml-auto"
    >
      <RouterLink :to="{name: 'registerStuff'}">
        <Button
          variant="outline"
        >
          Добавить учителя
        </Button>
      </RouterLink>
    </div>
  </div>
</template>