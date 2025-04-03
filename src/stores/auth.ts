import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { RegisterData, User } from '@/api/types/auth'

//
// Mock User until backend is ready
//

const mockUser = {
  name: 'Иван',
  lastName: 'Иванов',
  role: 'Ученик',
  class: '10А'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const localStorageUser = localStorage.getItem('user')
  if (localStorageUser) {
    user.value = JSON.parse(localStorageUser)
  }

  const isAuthorized = computed(() => {
    if (user.value) {
      return user.value.name && user.value.lastName && user.value.role;
    }
    return false
  })

  //
  // User login/logout
  //

  function login(): boolean {
    // TODO: replace with server request
    const response = {
      data: mockUser,
    }
    user.value = response.data
    localStorage.setItem('user', JSON.stringify(user.value))

    return true
  }

  function logout(): void {
    user.value = null;
    localStorage.removeItem('user')
  }

  //
  // User registration
  // 

  const initialRegisterData = {
    login: null,
    password: null,
    passwordConfirm: null,
  }
  const registerData = ref<RegisterData>(initialRegisterData)

  function setRegisterData(data: RegisterData): void {
    registerData.value = data;
  }

  function register(): boolean {
    // TODO: replace with server request
    const response = {
      data: mockUser,
    }
    user.value = response.data
    localStorage.setItem('user', JSON.stringify(user.value))

    return true
  }

  //
  // Exported members
  //

  return { 
    user, 

    isAuthorized,

    login, 
    logout,

    setRegisterData,
    register,
  }
})
