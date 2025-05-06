import type { User } from "../types/users";
import type { Response } from "../types/response";

import api from "..";

export type LoginParams = {
  login: string;
  password: string;
}
export type LoginResponse = {
  token: string;
  user: User;
}

const authService = {
  async login(params: LoginParams): Promise<Response<LoginResponse>> {
    const response = await api.post('/auth/login', params)
    return response
  },

  async logout(): Promise<Response<undefined>> {
    const response = await api.post('/auth/logout')
    return response
  },

  async refresh(): Promise<Response<LoginResponse>> {
    const response = await api.post('/auth/refresh')
    return response
  }
}
export default authService