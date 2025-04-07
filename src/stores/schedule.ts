import scheduleService, { type GetScheduleParams, type GetScheduleResponse, type UpdateScheduleHomeworkParams } from '@/api/services/scheduleService';
import type { Response } from '@/api/types/response';
import type { ScheduleExtended } from '@/api/types/shedule';
import { getFullName } from '@/utils/getFullName';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
  const schedule = ref<ScheduleExtended[]>([]);
  const date = ref('')

  const getDate = computed(() => date.value)

  function getSchedule(params: GetScheduleParams): Response<ScheduleExtended[]>{
    const response = scheduleService.getSchedule(params)

    if (response.status === 200) {
      if (params.date) {
        date.value = params.date
      }
      schedule.value = response.data.map(scheduleItem => {
        return {
          ...scheduleItem,
          teacherFullName: getFullName(scheduleItem.teacher)
        }
      })
    }

    return {
      data: schedule.value,
      status: response.status
    }
  }

  function deleteScheduleHomework(id: string): Response<undefined | GetScheduleResponse> {
    const response = scheduleService.deleteScheduleHomework(id)
    if (response.status === 200) {
      return getSchedule({ date: date.value })
    }
    return response; 
  }

  function updateScheduleHomework(id: string, params: UpdateScheduleHomeworkParams): Response<undefined | GetScheduleResponse> {
    const response = scheduleService.updateScheduleHomework(id, params)
    if (response.status === 200) {
      return getSchedule({ date: date.value })
    }
    return response; 
  }

  return {
    schedule,
    date,

    getDate,

    getSchedule,
    deleteScheduleHomework,
    updateScheduleHomework,
  }
})