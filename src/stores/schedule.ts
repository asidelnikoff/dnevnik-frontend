import scheduleService, { type GetScheduleParams, type GetScheduleResponse } from '@/api/services/scheduleService';
import type { Response } from '@/api/types/response';
import type { Schedule } from '@/api/types/shedule';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
  const schedule = ref<Schedule[]>([]);
  const date = ref('')

  const getDate = computed(() => date.value)

  function getSchedule(params: GetScheduleParams): Response<GetScheduleResponse>{
    const response = scheduleService.getSchedule(params)
    if (response.status === 200) {
      if (params.date) {
        date.value = params.date
      }
      schedule.value = response.data
    }

    return response
  }

  return {
    schedule,
    date,

    getDate,

    getSchedule,
  }
})