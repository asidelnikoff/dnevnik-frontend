import { type LoginParams, type LoginResponse } from '@/api/services/loginService';
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/api/types/users'
import loginService from '@/api/services/loginService';
import type { Response } from '@/api/types/response';

// This store manages user data and the token. It is responsible for loggin in
// and loggin out
export const useAuthStore = defineStore('auth', () => {
  //
  // User and their token
  //
  const user = ref<User | null>(null);
  const token = ref<string>(localStorage.getItem('token') || '');
  const localStorageUser = localStorage.getItem('user')
  if (localStorageUser) {
    user.value = JSON.parse(localStorageUser)
  }
  //
  // Getters
  //
  const getName = computed(() => {
    return user?.value?.name || ''
  })
  const getLastName = computed(() => {
    return user?.value?.lastName || ''
  })
  const getMiddleName = computed(() => {
    return user?.value?.middleName || ''
  })

  const isTeacher = computed(() => {
    return user?.value?.role === 'Учитель'
  })
  const isHeadteacher = computed(() => {
    return user?.value?.role === 'Заведующий учебной частью'
  })

  const isAuthorized = computed(() => {
    if (user.value) {
      return user.value.name && user.value.lastName && user.value.role && token.value;
    }
    return false
  })
  //
  // User login/logout
  //
  function login(params: LoginParams, rememberMe: boolean): Response<LoginResponse> {
    const response = loginService.login(params)
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
  function logout(): void {
    user.value = null;
    localStorage.removeItem('user')
  }
  //
  // Exported members
  //
  return { 
    user, 

    getName,
    getLastName,
    getMiddleName,

    isTeacher,
    isHeadteacher,

    isAuthorized,

    login, 
    logout,
  }
})
