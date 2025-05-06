import authService, { type LoginParams, type LoginResponse } from '@/api/services/authService';
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/api/types/users'
import type { Response } from '@/api/types/response';
import type { UpdatePasswordParams } from '@/api/services/usersService';
import userService from '@/api/services/usersService';

// This store manages user data and the token. It is responsible for loggin in
// and loggin out
export const useAuthStore = defineStore('auth', () => {
  //
  // User and their token
  //
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token') || null)
  const localStorageUser = localStorage.getItem('user') || null
  if (localStorageUser) {
    user.value = JSON.parse(localStorageUser)
  }
  //
  // Getters
  //
  const getName = computed(() => {
    return user?.value?.first_name || ''
  })
  const getLastName = computed(() => {
    return user?.value?.last_name || ''
  })
  const getMiddleName = computed(() => {
    return user?.value?.middle_name || ''
  })

  const getToken = computed(() => token.value)

  const getRole = computed(() => {
    switch (user?.value?.role) {
      case 'student':
        return 'Ученик'
      case 'teacher':
        return 'Учитель'
      case 'headteacher':
        return 'Заведующий учебной частью'
      default:
        return ''
    }
  })

  const isStudent = computed(() => {
    return user?.value?.role === 'student'
  })
  const isTeacher = computed(() => {
    return user?.value?.role === 'teacher' 
  })
  const isHeadteacher = computed(() => {
    return user?.value?.role === 'headteacher'
  })

  const isAuthorized = computed(() => {
    return user.value && token.value
  })
  //
  // User login/logout
  //
  async function login(params: LoginParams, rememberMe: boolean): Promise<Response<LoginResponse>> {
    const response = await authService.login(params)
    if (response.status === 200) {
      user.value = response.data.user
      token.value = response.data.token

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user.value))
        localStorage.setItem('token', token.value)
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }

    return response
  }
  async function logout(): Promise<Response<undefined>> {
    const response = await authService.logout()
    user.value = null;
    token.value = null;
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return response
  }
  async function updatePassword(params: UpdatePasswordParams): Promise<Response<undefined>> {
    const response = await userService.updatePassword(params)
    return response
  }
  //
  // Exported members
  //
  return { 
    user, 

    getName,
    getLastName,
    getMiddleName,
    getToken,
    getRole,

    isStudent,
    isTeacher,
    isHeadteacher,

    isAuthorized,

    login, 
    logout,
    updatePassword,
  }
})
