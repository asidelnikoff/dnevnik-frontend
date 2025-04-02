import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode();

export function useShadowColor() {

  const shadowColor = computed(() => {
    return mode.value === 'light' ? 'shadow-gray-200' : 'shadow-gray-800';
  })

  return { shadowColor }
}