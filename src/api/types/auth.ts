export type LoginParams = {
  login: string;
  password: string;
}

export type User = {
  name: string,
  lastName: string,
  middleName?: string,
  role: string,
  class?: string,
  subject?: string,
}

export type RegisterData = {
  login: string,
  password: string,
  passwordConfirm: string,
}