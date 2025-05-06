<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next';
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue';

// Toggle between 'password' and 'text' types
const props = defineProps({
  isVisibleByDefault: {
    type: Boolean,
    default: false,
  }
})
const inputType = ref<'password' | 'text'>(props.isVisibleByDefault ? 'text' : 'password');
const toggleVisibility = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};
</script>

<template>
  <div class="relative">
    <Input
      v-bind="$attrs"
      :type="inputType"
      class="w-full pr-10"
    />
    <button
      type="button"
      class="absolute right-0 top-0 h-full px-3 flex items-center justify-center"
      @click="toggleVisibility"
    >
      <component
        :is="inputType === 'password' ? Eye : EyeOff"
        class="size-4 text-muted-foreground hover:text-foreground transition-colors"
      />
    </button>
  </div>
</template>