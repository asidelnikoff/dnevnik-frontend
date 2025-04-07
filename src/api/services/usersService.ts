import type { Student, Stuff, Teacher } from "../types/users";
import type { Response } from "../types/response";
import type { LoginParams } from "./loginService";
import { getFullName } from "@/utils/getFullName";

export type UpdatePasswordParams = {
  newLogin?: string;
  oldPassword: string;
  newPassword: string;
}
export type UpdatePasswordResponse = void

export type GetStudentsParams = {
  class?: string;
  search?: string;
  sort?: 'name_asc' | 'name_desc'
}
export type GetStudentsResponse = Student[]

export type GetStuffParams = {
  role?: string;
  search?: string;
  sort?: 'name_asc' | 'name_desc'
}
export type GetStuffResponse = Stuff[]

export type CreateStudentParams = LoginParams & {
  name: string;
  lastName: string;
  middleName?: string;
  class: string;
}
export type CreateStudentResponse = Student

export type CreateTeacherParams = LoginParams & {
  name: string;
  lastName: string;
  middleName?: string;
  subject: string;
}
export type CreateTeacherResponse = Teacher

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Иван',
    lastName: 'Крылов',
    class: '10А',
    role: 'Ученик'
  },
  {
    id: '2',
    name: 'Олег',
    lastName: 'Иванов',
    class: '1Б',
    role: 'Ученик'
  },
]

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Петр',
    lastName: 'Петров',
    subject: 'Русский язык',
    role: 'Учитель'
  },
]

export const mockStuff: Stuff[] = [
  ...mockTeachers,
  {
    id: '2',
    name: 'Руслан',
    lastName: 'Журавлев',
    subject: 'Математика',
    role: 'Заведующий учебной частью',
  },
]


const userService = {
  /* 
  POST /users/me - requires token
  */
  updatePassword(params: UpdatePasswordParams): Response<UpdatePasswordResponse> {
    console.log(params)
    return {
      data: undefined,
      status: 200
    }
  },

  /* 
  GET /users/students - requires token
  */
  getStudents(params: GetStudentsParams): Response<GetStudentsResponse> {
    console.log(params)
    if (typeof params.search === 'string') {
      const search = params.search as string;
      return {
        data: mockStudents.filter(student => getFullName(student).toLowerCase().includes(search.toLowerCase() as string)),
        status: 200,
      }
    }
    return {
      data: mockStudents,
      status: 200
    }
  },

  /* 
  GET /users/teachers - requires token
  */
  getStuff(params: GetStuffParams): Response<GetStuffResponse> {
    console.log(params)
    if (typeof params.search === 'string') {
      const search = params.search as string;
      return {
        data: mockStuff.filter(stuff => getFullName(stuff).toLowerCase().includes(search.toLowerCase() as string)),
        status: 200,
      }
    }
    return {
      data: mockStuff,
      status: 200
    }
  },

  /* 
  POST /users/students - requires token
  */
  createStudent(params: CreateStudentParams): Response<CreateStudentResponse> {
    console.log(params)
    const mockStudent: Student = {
      id: '3',
      name: params.name,
      lastName: params.name,
      middleName: params.middleName,
      class: params.class,
      role: 'Ученик',
    }
    mockStudents.push(mockStudent)
    return {
      data: mockStudent,
      status: 200
    }
  },

  /* 
  POST /users/teachers - requires token
  */
  createTeacher(params: CreateTeacherParams): Response<CreateTeacherResponse> {
    console.log(params)
    const mockTeacher: Teacher = {
      id: '3',
      name: params.name,
      lastName: params.lastName,
      middleName: params.middleName,
      subject: params.subject,
      role: 'Учитель',
    }

    mockStuff.push(mockTeacher)
    return {
      data: mockTeacher,
      status: 200
    }
  }
}
export default userService