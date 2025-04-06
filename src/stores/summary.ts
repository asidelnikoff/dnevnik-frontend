import scheduleService, { type CreateScheduleParams, type CreateScheduleResponse, type GetScheduleSummaryParams, type GetScheduleSummaryResponse } from '@/api/services/scheduleService';
import type { Response } from '@/api/types/response';
import type { Schedule } from '@/api/types/shedule';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSummaryStore = defineStore('summary', () => {
  const summary = ref<Schedule[]>([]);

  function getSummary(params: GetScheduleSummaryParams): Response<GetScheduleSummaryResponse>{
    const response = scheduleService.getSheduleSummary(params)
    if (response.status === 200) {
      summary.value = response.data
    }

    return response
  }
  
  function createSchedule(params: CreateScheduleParams): Response<CreateScheduleResponse> {
    const response = scheduleService.createSchedule(params)

    return response
  }

  return {
    summary,

    getSummary,
    createSchedule,
  }
})