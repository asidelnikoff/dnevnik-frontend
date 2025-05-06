import type { Student, Teacher } from "../types/users";
import type { Response } from "../types/response";
import type { LoginParams } from "./authService";

import api from "..";

export type UpdatePasswordParams = {
  new_login?: string;
  old_password: string;
  new_password?: string;
}

export type GetStudentsParams = {
  class?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  sort?: 'name_asc' | 'name_desc' | 'class_asc' | 'class_desc'
  Page?: number;
  Limit?: number;
  Offset?: number;
}
export type GetStudentsResponse = {
  id: string;
  full_name: string;
  class: string;
}[]

export type GetStuffParams = {
  subject?: string;
  role?: 'teacher' | 'headteacher';
  firstName?: string;
  lastName?: string;
  middleName?: string;
  sort?: 'name_asc' | 'name_desc'
  Page?: number;
  Limit?: number;
  Offset?: number;
}
export type GetStuffResponse = {
  id: string;
  full_name: string;
  subject: string;
  role: 'teacher' | 'headteacher'
}[]

export type CreateStudentParams = LoginParams & {
  first_name: string;
  last_name: string;
  middle_name?: string;
  class: string;
}
export type CreateStudentResponse = Student

export type DeleteStudentParams = {
  id: string;
}
export type DeleteTeacherParams = {
  id: string;
}

export type CreateTeacherParams = LoginParams & {
  first_name: string;
  last_name: string;
  middle_name?: string;
  subject: string;
}
export type CreateTeacherResponse = Teacher
const userService = {
  async updatePassword(params: UpdatePasswordParams): Promise<Response<undefined>> {
    const response = await api.put('/users/me', params)
    return response
  },

  async getStudents(params: GetStudentsParams): Promise<Response<GetStudentsResponse>> {
    const response = await api.get('/users/students', { params })
    return response;
  },

  async getStuff(params: GetStuffParams): Promise<Response<GetStuffResponse>> {
    const response = await api.get('/users/stuff', { params })
    return response;
  },

  async createStudent(params: CreateStudentParams): Promise<Response<CreateStudentResponse>> {
    const response = await api.post('/users/students', params)
    return response
  },

  async createTeacher(params: CreateTeacherParams): Promise<Response<CreateTeacherResponse>> {
    const response = await api.post('/users/teachers', params)
    return response
  },

  async deleteStudent(id: string): Promise<Response<undefined>> {
    const response = await api.delete(`/users/students/${id}`)
    return response
  },

  async deleteTeacher(id: string): Promise<Response<undefined>> {
    const response = await api.delete(`/users/teachers/${id}`)
    return response
  },
}
export default userService