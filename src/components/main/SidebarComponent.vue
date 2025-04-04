<script setup lang="ts">
import { Home, Users, UsersRound, Calendar, UserPen, LogOut } from "lucide-vue-next"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const contentItems = [
  {
    title: "Домашняя",
    routeName: 'home',
    icon: Home,
  },
  {
    title: "Ученики",
    routeName: 'students',
    icon: Users,
  },
  {
    title: "Сотрудники",
    routeName: 'stuff',
    icon: UsersRound,
  },
  {
    title: "Сводное",
    routeName: 'schedule',
    icon: Calendar,
  }
];

const footerItems = [
  {
    title: "Профиль",
    routeName: "profile",
    icon: UserPen,
  },
  {
    title: "Выйти",
    routeName: "login",
    icon: LogOut,
  },
]
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in contentItems"
              :key="item.title"
            >
              <SidebarMenuButton
                as-child
                :is-active="item.routeName == $route.name"
              >
                <RouterLink :to="{ name: item.routeName }">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in footerItems"
              :key="item.title"
            >
              <SidebarMenuButton
                as-child
                :is-active="item.routeName == $route.name"
              >
                <RouterLink :to="{ name: item.routeName }">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarFooter>
  </Sidebar>
</template>