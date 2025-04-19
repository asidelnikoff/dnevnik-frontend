
import type { CreateTeacherParams, CreateTeacherResponse, DeleteTeacherParams, GetStuffParams, GetStuffResponse } from '@/api/services/usersService';
import userService from '@/api/services/usersService';
import type { Stuff } from '@/api/types/users';
import type { Response } from '@/api/types/response';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStuffStore = defineStore('stuff', () => {
  const stuff = ref<Stuff[]>([]);

  function getStuff(params: GetStuffParams): Response<GetStuffResponse>{
    const response = userService.getStuff(params)
    if (response.status === 200) {
      stuff.value = response.data
    }

    return response
  }

  function createTeacher(params: CreateTeacherParams): Response<CreateTeacherResponse> {
    const response = userService.createTeacher(params)

    return response
  }

  function deleteTeacher(params: DeleteTeacherParams): Response<undefined> {
    const response = userService.deleteTeacher(params)

    if (response.status === 200) {
      stuff.value = stuff.value.filter(stuff => stuff.id !== params.id)
    }

    return response
  }

  return {
    stuff,

    getStuff,
    createTeacher,
    deleteTeacher,
  }
})