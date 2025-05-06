import type { Student, Stuff } from "./users"

export type Grade = {
  grade: number | string,
  comment: string,
}

export type ScheduleGradeItem = {
  student: Student,
  grades: Grade[]
}

type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
export type ScheduleValue = {
  id: string;
  start_date: string; // ISO date format
  end_date: string; // ISO date format
  week_days: WeekDay[];
  start_time: string;
  end_time: string;
  subject: string;
  teacher: Stuff;
  class: string;
  homework?: string;
  grades: number[];
}

interface ScheduleItem {
  key: string;
  value: ScheduleValue | null;
}

type ScheduleGroup = {
  [key: string]: ScheduleItem[];
};

export type ScheduleData = {
  [key: string]: ScheduleGroup;
};