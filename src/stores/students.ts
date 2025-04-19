import userService, { type CreateStudentParams, type CreateStudentResponse, type DeleteStudentParams, type GetStudentsParams, type GetStudentsResponse } from '@/api/services/usersService';
import type { Student } from '@/api/types/users'
import type { Response } from '@/api/types/response';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudentsStore = defineStore('students', () => {
  const students = ref<Student[]>([]);

  function getStudents(params: GetStudentsParams): Response<GetStudentsResponse>{
    const response = userService.getStudents(params)
    if (response.status === 200) {
      students.value = response.data
    }

    return response
  }

  function createStudent(params: CreateStudentParams): Response<CreateStudentResponse> {
    const response = userService.createStudent(params)

    return response
  }

  function deleteStudent(params: DeleteStudentParams): Response<undefined> {
    const response = userService.deleteStudent(params)

    if (response.status === 200) {
      console.log(200)
      students.value = students.value.filter(student => student.id !== params.id)
    }

    return response
  }

  return {
    students, 

    getStudents,
    createStudent,
    deleteStudent,
  }
})