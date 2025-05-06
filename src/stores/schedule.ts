import scheduleService, { type GetScheduleParams, type GetScheduleResponse, type UpdateScheduleHomeworkParams } from '@/api/services/scheduleService';
import type { Response } from '@/api/types/response';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
  const schedule = ref<GetScheduleResponse>([]);
  const date = ref('')

  const getDate = computed(() => {
    const dateItems = date.value.split('-');
    return dateItems[2] + '.' + dateItems[1] + '.' + dateItems[0]
  })

  function findById(id: string) {
    return schedule.value.find(scheduleItem => scheduleItem.id === id)
  }

  async function getSchedule(params: GetScheduleParams): Promise<Response<GetScheduleResponse>>{
    date.value = params.startDate || '';
    schedule.value = []
    const response = await scheduleService.getSchedule(params)
    schedule.value = response.data
    return response
  }

  async function deleteScheduleHomework(id: string): Promise<Response<undefined>> {
    const response = await scheduleService.deleteScheduleHomework(id)
    schedule.value = schedule.value.map(schedule => {
      if (schedule.id === id) {
        delete schedule.homework
      }
      return schedule
    })
    return response
  }

  async function updateScheduleHomework(id: string, params: UpdateScheduleHomeworkParams): Promise<Response<undefined>> {
    const response = await scheduleService.updateScheduleHomework(id, params)
    schedule.value = schedule.value.map(item => {
      if (item.id === id) {
        item.homework = params.homework
      }
      return item
    })
    return response
  }

  return {
    schedule,
    date,

    findById,
    getDate,

    getSchedule,
    deleteScheduleHomework,
    updateScheduleHomework,
  }
})