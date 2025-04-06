export type User = {
  id: string,
  name: string,
  lastName: string,
  middleName?: string,
  role: string,
}

export type Student = User & {
  role: 'Ученик',
  class: string;
}

export type Teacher = User & {
  role: 'Учитель',
  subject: string;
}

export type HeadTeacher = User & {
  subject: string;
  role: 'Заведующий учебной частью'
}

export type Stuff = Teacher | HeadTeacher