import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import RegisterLayout from '@/layouts/RegisterLayout.vue'
import RegisterStudentView from '@/views/RegisterStudentView.vue'
import RegisterStuffView from '@/views/RegisterStuffView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //
    // Authentication pages
    //
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: AuthLayout }
    },
    //
    // Register pages
    //
    {
      path: '/register-student',
      name: 'registerStudent',
      component: RegisterStudentView,
      meta: { layout: RegisterLayout },
    },
    {
      path: '/register-stuff',
      name: 'registerStuff',
      component: RegisterStuffView,
      meta: { layout: RegisterLayout },
    },
    //
    // Main pages
    // 
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: MainLayout }
    },
    {
      path: '/students',
      name: 'students',
      component: import('@/views/StudentsView.vue'),
      meta: { layout: MainLayout }
    },
    {
      path: '/stuff',
      name: 'stuff',
      component: import('@/views/StuffView.vue'),
      meta: { layout: MainLayout }
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: import('@/views/ScheduleView.vue'),
      meta: { layout: MainLayout }
    },
    {
      path: '/profile',
      name: 'profile',
      component: import('@/views/ProfileView.vue'),
      meta: { layout: MainLayout }
    }
  ],
})

const privateRoutes = ['home', 'students', 'stuff', 'schedule', 'profile']

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if ( to.name === 'login' ) {
    authStore.logout()
  }

  // Prevent private routes usage for unauthorized users
  const isAuthenticated = authStore.isAuthorized
  if (
    !isAuthenticated &&
    privateRoutes.includes(to.name as string)
  ) {
    return { name: 'login' }
  }
})

export default router
