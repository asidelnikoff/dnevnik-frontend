import type { Response } from "../types/response";
import type { Schedule, ScheduleGradeItem } from "../types/shedule";
import { mockStudents, mockStuff, mockTeachers } from "./usersService";

export type GetScheduleParams = {
  date?: string,
}
export type GetScheduleResponse = Schedule[]

export type GetScheduleSummaryParams = {
  date?: string,
  startTime?: string,
}
export type GetScheduleSummaryResponse = Schedule[] 

export type CreateScheduleParams = {
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  weekDays: string[];
  class: string;
  subject: string;
  teacherId: string;
}
export type CreateScheduleResponse = Schedule

export type UpdateScheduleParams = {
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  weekDays: string[];
  class: string;
  subject: string;
  teacherId: string;
}
export type UpdateScheduleResponse = Schedule

export type GetScheduleGradesResponse = ScheduleGradeItem[]

export type UpdateScheduleGradesParams = Array<{
  studentId: string,
  lessonGrade: number,
  homeworkGrade: number
}>

export type GetScheduleHomeworkResponse = {
  homework: string,
}

export type UpdateScheduleHomeworkParams = {
  homework: string,
}

const mockSchedule: Schedule[] = [
 {
    id: '1',
    startDate: '05.04.2025',
    endDate: '05.07.2025',
    weekDays: ['Понедельник', 'Среда'],
    startTime: '8:00',
    endTime: '8:45',
    subject: 'Русский язык',
    teacher: mockTeachers[0],
    class: '10А',
    homework: 'п.5 + таблица',
    grades: [{
      grade: 5,
      comment: 'test'
    }]
  },
  {
    id: '2',
    startDate: '05.04.2025',
    endDate: '05.07.2025',
    weekDays: ['Понедельник', 'Среда'],
    startTime: '9:00',
    endTime: '9:45',
    subject: 'Математика',
    teacher: mockStuff[0],
    class: '7Б',
    grades: [{
      grade: 5,
      comment: 'test'
    }]
  },
  {
    id: '3',
    startDate: '05.04.2025',
    endDate: '05.07.2025',
    weekDays: ['Понедельник', 'Среда'],
    startTime: '10:00',
    endTime: '10:45',
    subject: 'Химия',
    teacher: mockStuff[1],
    class: '5В',
    homework: 'конспект',
    grades: [{
      grade: 5,
      comment: 'test'
    }]
  },
]

const scheduleService = {
  /*
  GET /shedule - requires token
  */
  getSchedule(params: GetScheduleParams): Response<GetScheduleResponse> {
    console.log(params)

    return {
      data: mockSchedule,
      status: 200,
    }
  },
  /*
  GET /shedule/summary - requires token
  */
  getSheduleSummary(params: GetScheduleSummaryParams): Response<GetScheduleSummaryResponse> {
    console.log(params)

    return {
      data: mockSchedule,
      status: 200,
    }
  },
  /*
  POST /shedule - requires token (headteacher)
  */
  createSchedule(params: CreateScheduleParams): Response<CreateScheduleResponse> {
    console.log(params)

    const mockCreateSchedule = {
      id: '2',
      startDate: params.startDate,
      endDate: params.endDate,
      startTime: params.startTime,
      endTime: params.endTime,
      weekDays: params.weekDays,
      class: params.class,
      subject: params.subject,
      teacher: mockStuff.find(teacher => teacher.id === params.teacherId) || mockStuff[0]
    }
    mockSchedule.push(mockCreateSchedule)

    return {
      data: mockCreateSchedule,
      status: 200,
    }
  },
  /*
  PUT /shedule/{id} - requires token (headteacher)
  */
  updateSchedule(id: string, params: UpdateScheduleParams): Response<UpdateScheduleResponse> {
    console.log(id, params)

    const mockUpdateSchedule = {
      id: '2',
      startDate: params.startDate,
      endDate: params.endDate,
      startTime: params.startTime,
      endTime: params.endTime,
      weekDays: params.weekDays,
      class: params.class,
      subject: params.subject,
      teacher: mockTeachers[0]
    }
    mockSchedule.pop()
    mockSchedule.push(mockUpdateSchedule)

    return {
      data: mockUpdateSchedule,
      status: 200,
    }
  },
  /*
  DELETE /schedule/{id} - requires token (headteacher)
  */
  deleteSchedule(id: string): Response<undefined> {
    mockSchedule.filter(item => item.id !== id)

    return {
      data: undefined,
      status: 200,
    }
  },
  /*
  GET /schedule/{id}/grades - requires token
  */
  getScheduleGrades(id: string): Response<GetScheduleGradesResponse> {
    console.log(id)

    return {
      data: [
        {
          student: mockStudents[0],
          grades: [
            {
              grade: 5,
              comment: 'Молодец!'
            }
          ] 
        }
      ],
      status: 200
    }
  },
  /*
  PUT /schedule/{id}/grades - requires token
  */
  updateScheduleGrades(id: string, params: UpdateScheduleGradesParams): Response<undefined> {
    console.log(id, params)

    return {
      data: undefined,
      status: 200
    }
  },
  /*
  GET /schedule/{id}/homework - requires token
  */
  getScheduleHomework(id: string): Response<GetScheduleHomeworkResponse> {
    console.log(id)

    return {
      data: {
        homework: 'п.5 + таблица',
      },
      status: 200
    }
  },
  /*
  PUT /schedule/{id}/homework - requires token
  */
  updateScheduleHomework(id: string, params: UpdateScheduleHomeworkParams): Response<undefined> {
    console.log(id, params)

    const scheduleId = mockSchedule.findIndex(scheduleItem => scheduleItem.id === id)
    mockSchedule[scheduleId].homework = params.homework

    return {
      data: undefined,
      status: 200
    }
  },
  /*
  DELETE /schedule/{id}/homework - requires token
  */
  deleteScheduleHomework(id: string): Response<undefined> {
    console.log(id)

    const scheduleId = mockSchedule.findIndex(scheduleItem => scheduleItem.id === id)
    mockSchedule[scheduleId].homework = ''

    return {
      data: undefined,
      status: 200
    }
  },
}
export default scheduleService