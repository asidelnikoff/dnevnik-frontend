import type { Student, Stuff } from "./users"

export type Grade = {
  grade: number,
  comment: string,
}

export type ScheduleGradeItem = {
  student: Student,
  grades: Grade[]
}

export type Schedule = {
  id: string,
  weekDays: string[],
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  subject: string,
  teacher: Stuff,
  class: string,
  homework?: string,
  grades?: Grade[]
}

export type ScheduleExtended = Schedule & {
  teacherFullName: string;
}