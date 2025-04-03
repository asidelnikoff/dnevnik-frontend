<script setup lang="ts">
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from '@/components/main/SidebarComponent.vue'
</script>

<template>
  <SidebarProvider>
    <Sidebar />
    <div class="p-20 w-full flex justify-center items-center">
      <RouterView />
    </div>
  </SidebarProvider>
</template>