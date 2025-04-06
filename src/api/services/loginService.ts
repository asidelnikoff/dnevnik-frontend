import type { User } from "../types/users";
import type { Response } from "../types/response";

export type LoginParams = {
  login: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  user: User;
}

const mockRegisteredUsers: Array<User> = [
  {
    id: '1',
    role: 'Ученик',
    name: 'Иван',
    lastName: 'Иванов',
  },
  {
    id: '2',
    role: 'Учитель',
    name: 'Иван',
    lastName: 'Иванов',
  },
  {
    id: '1',
    role: 'Заведующий учебной частью',
    name: 'Иван',
    lastName: 'Иванов',
  },
]

const loginService = {
  /* 
  POST /auth/login
  */
  login(params: LoginParams): Response<LoginResponse> {
    let mockRegisteredUser = mockRegisteredUsers.find(user => user.role === 'Ученик') as User 
    if (params.login === 'headteacher') {
      mockRegisteredUser = mockRegisteredUsers.find(user => user.role === 'Заведующий учебной частью') as User
    } else if (params.login === 'teacher') {
      mockRegisteredUser = mockRegisteredUsers.find(user => user.role === 'Учитель') as User
    }

    return {
      data: {
        token: 'mock',
        user: mockRegisteredUser,
      },
      status: 200
    }
  }
}
export default loginService