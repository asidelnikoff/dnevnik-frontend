import userService, { type CreateStudentParams, type CreateStudentResponse, type GetStudentsParams, type GetStudentsResponse } from '@/api/services/usersService';
import type { Response } from '@/api/types/response';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudentsStore = defineStore('students', () => {
  const students = ref<GetStudentsResponse>([]);

  async function getStudents(params: GetStudentsParams): Promise<Response<GetStudentsResponse>>{
    const response = await userService.getStudents(params)
    students.value = response.data
    return response
  }

  async function createStudent(params: CreateStudentParams): Promise<Response<CreateStudentResponse>> {
    const response = await userService.createStudent(params)
    return response
  }

  async function deleteStudent(id: string): Promise<Response<undefined>> {
    const response = await userService.deleteStudent(id)
    students.value = students.value.filter(student => student.id !== id)
    return response
  }

  return {
    students, 

    getStudents,
    createStudent,
    deleteStudent,
  }
})