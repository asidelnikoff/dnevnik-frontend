<script setup lang='ts'>
import { onBeforeMount, ref, watch } from 'vue';

import { useAuthStore } from '@/stores/auth';
import { useStuffStore } from '@/stores/stuff';

import type { GetStuffParams } from '@/api/services/usersService';

import { Button } from '@/components/ui/button'

import StuffFilters from '@/components/stuff/StuffFilters.vue';
import StuffTable from '@/components/stuff/StuffTable.vue';

const authStore = useAuthStore()

const params = ref<GetStuffParams>({
  search: '',
})
watch(params, () => {
  getStuff();
}, {
  deep: true
})

const stuffStore = useStuffStore()
function getStuff() {
  stuffStore.getStuff(params.value)
}

onBeforeMount(() => {
  getStuff()
})
</script>

<template>
  <div class="w-5/10">
    <StuffFilters v-model:search="params.search" />
    <StuffTable :stuff="stuffStore.stuff" />
    <div
      v-if="true"
      class="w-fit mt-3 ml-auto"
    >
      <RouterLink :to="{name: 'registerStuff'}">
        <Button
          v-if="authStore.isHeadteacher"
          variant="outline"
        >
          Добавить учителя
        </Button>
      </RouterLink>
    </div>
  </div>
</template>