import api from "..";
import type { Response } from "../types/response";
import type { ScheduleValue, ScheduleData, ScheduleGradeItem, Grade } from "../types/shedule";

export type GetScheduleParams = {
  startDate?: string,
  endDate?: string,
  startTime?: string,
  endTime?: string,
}
export type GetScheduleResponse = ScheduleValue[]

export type GetScheduleSummaryParams = {
  startDate?: string,
  endDate?: string,
  startTime?: string,
  endTime?: string,
  classes?: string[],
}
export type GetScheduleSummaryResponse = ScheduleData

export type CreateScheduleParams = {
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  week_days: string[];
  class: string;
  subject: string;
  teacher_id: string;
}

export type GetScheduleGradesResponse = ScheduleGradeItem[]

export type UpdateScheduleGradesParams = Array<{
  student_id: string,
  grades: Grade[],
}>

export type GetScheduleHomeworkResponse = {
  homework: string,
}

export type UpdateScheduleHomeworkParams = {
  homework: string,
}

const scheduleService = {
  async getSchedule(params: GetScheduleParams): Promise<Response<GetScheduleResponse>> {
    const response = await api.get('/schedule', { params })
    return response
  },

  async getSheduleSummary(params: GetScheduleSummaryParams): Promise<Response<GetScheduleSummaryResponse>> {
    const response = await api.get('/summary', { params })
    return response
  },

  async createSchedule(params: CreateScheduleParams): Promise<Response<undefined>> {
    const response = await api.post('/schedule', params)
    return response
  },

  async deleteLesson(lessonId: string): Promise<Response<undefined>> {
    const response = await api.delete(`/schedule/${lessonId}`)
    return response
  },

  async getScheduleGrades(id: string): Promise<Response<GetScheduleGradesResponse>> {
    const response = await api.get(`/schedule/${id}/grades`)
    return response
  },
  async saveScheduleGrades(scheduleId: string, params: UpdateScheduleGradesParams): Promise<Response<undefined>> {
    const response = await api.put(`/schedule/${scheduleId}/grades`, params)
    return response
  },
  async updateScheduleHomework(id: string, params: UpdateScheduleHomeworkParams): Promise<Response<undefined>> {
    const response = await api.post(`/schedule/${id}/homework`, params)
    return response
  },
  async deleteScheduleHomework(id: string): Promise<Response<undefined>> {
    const response = await api.delete(`/schedule/${id}/homework`)
    return response
  },
}
export default scheduleService