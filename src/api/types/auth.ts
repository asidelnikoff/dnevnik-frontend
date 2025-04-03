export type LoginParams = {
  login: string;
  password: string;
}

export type User = {
  name: string | null,
  lastName: string | null,
  middleName?: string | null,
  role: string | null,
  class?: string | null,
  subject?: string | null,
}

export type RegisterData = {
  login: string | null,
  password: string | null,
  passwordConfirm: string | null,
}