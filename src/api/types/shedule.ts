import type { Teacher } from "./users"

export type Schedule = {
  id: string,
  weekDays: string[],
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  subject: string,
  teacher: Teacher,
  class: string,
  homework?: string,
  lessonGrade?: number,
  homeworkGrade?: number
}

export type ScheduleTableItem = {
  teacherFullName: string;
}