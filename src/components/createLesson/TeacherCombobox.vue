<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList } from '@/components/ui/combobox'
import { Check, Search } from 'lucide-vue-next'
import { useStuffStore } from '@/stores/stuff'
import { computed, onMounted, ref } from 'vue'
import type { Stuff } from '@/api/types/users'
import { getFullName } from '@/utils/getFullName'
import Label from '../ui/label/Label.vue'

defineEmits(['change'])

const stuff = ref<Stuff[]>([])
const stuffStore = useStuffStore()
onMounted(() => {
  const response = stuffStore.getStuff({})
  if (response.status === 200) {
    stuff.value = response.data
  }
})

const stuffSelectValues = computed(() => {
  return stuff.value.map(stuffMember => {
    return {
      value: stuffMember.id,
      label: `${getFullName(stuffMember)}, ${stuffMember.subject}`
    }
  })
})
</script>

<template>
  <Combobox
    by="label"
    class="w-full"
  >
    <ComboboxAnchor class="w-full flex flex-col gap-2">
      <Label for="terms"><span>Учитель<sup>*</sup></span></Label>
      <div class="relative w-full rounded-md border items-center">
        <ComboboxInput
          class="border-none pl-2"
          :display-value="(val) => val?.label ?? ''"
          placeholder="Выберите учителя"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
    </ComboboxAnchor>

    <ComboboxList class="w-full">
      <ComboboxEmpty>
        Учителя не найдены
      </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="teacher in stuffSelectValues"
          :key="teacher.value"
          :value="teacher"
          @select="() => {
            $emit('change', teacher.value)
          }"
        >
          {{ teacher.label }}

          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>