export type User = {
  id: string,
  login?: string,
  first_name: string,
  last_name: string,
  middle_name?: string,
  role: "student" | "teacher" | "headteacher",
}

export type Student = User & {
  role: "student",
  class: string;
}

export type Teacher = User & {
  role: "teacher",
  subject: string;
}

export type HeadTeacher = User & {
  subject: string;
  role: "headteacher" 
}

export type Stuff = Teacher | HeadTeacher