import scheduleService, { type CreateScheduleParams, type GetScheduleSummaryParams, type GetScheduleSummaryResponse } from '@/api/services/scheduleService';
import type { Response } from '@/api/types/response';
import type { ScheduleValue } from '@/api/types/shedule';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSummaryStore = defineStore('summary', () => {
  const summary = ref<GetScheduleSummaryResponse>({});
  const newLessonData = ref<Partial<CreateScheduleParams>>()

  function getNewLessonData() {
    return newLessonData.value
  }

  function setNewLessonData(data: Partial<CreateScheduleParams>) {
    newLessonData.value = data
  }

  async function getSummary(params: GetScheduleSummaryParams): Promise<Response<GetScheduleSummaryResponse>>{
    const response = await scheduleService.getSheduleSummary(params)
    summary.value = response.data

    return response
  }

  async function createLesson(params: CreateScheduleParams): Promise<Response<undefined>> {
    const response = await scheduleService.createSchedule(params)
    return response;
  }

  async function deleteLesson(lesson: ScheduleValue, weekDay: string, id: number): Promise<Response<undefined>> {
    const response = await scheduleService.deleteLesson(lesson.id)
    summary.value[lesson.class][weekDay][id].value = null
    return response
  }

  return {
    summary,

    getNewLessonData,
    setNewLessonData,

    getSummary,
    deleteLesson,
    createLesson,
  }
})