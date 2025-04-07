import type { Stuff } from "./users"

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
  lessonGrade?: number,
  homeworkGrade?: number
}

export type ScheduleExtended = Schedule & {
  teacherFullName: string;
}