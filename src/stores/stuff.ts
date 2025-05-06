
import type { CreateTeacherParams, CreateTeacherResponse, GetStuffParams, GetStuffResponse } from '@/api/services/usersService';
import userService from '@/api/services/usersService';
import type { Response } from '@/api/types/response';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStuffStore = defineStore('stuff', () => {
  const stuff = ref<GetStuffResponse>([]);

  async function getStuff(params: GetStuffParams): Promise<Response<GetStuffResponse>> {
    const response = await userService.getStuff(params)
    stuff.value = response.data;
    return response
  }

  async function createTeacher(params: CreateTeacherParams): Promise<Response<CreateTeacherResponse>> {
    const response = await userService.createTeacher(params)
    return response
  }

  async function deleteTeacher(id: string): Promise<Response<undefined>> {
    const response = await userService.deleteTeacher(id)
    stuff.value = stuff.value.filter(stuff => stuff.id !== id)
    return response
  }

  return {
    stuff,

    getStuff,
    createTeacher,
    deleteTeacher,
  }
})