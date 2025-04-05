import type { User } from '@/api/types/auth';
import { defineStore } from 'pinia'
import { ref } from 'vue'

//
// Mock Summary until backend is ready
//

export type Summary = {
  id: string;
  class: string;
  subject: string;
  teacher: User;
}

export type Lesson = {
  subject: string;
  class: string;
  time: string;
  startDate: string;
  endDate: string;
}

const mockSummary: Summary[] = [
  {
    id: '1',
    class: '10А',
    subject: 'Русский язык',
    teacher: {
      name: 'Иван',
      lastName: 'Иванов',
      role: 'Учитель'
    }
  }
] 

export const useSummaryStore = defineStore('summary', () => {
  const summary = ref<Summary[]>([]);

  function getSummary(): boolean{
    // TODO: change to server request
    const response = {
      data: mockSummary,
    }
    summary.value = response.data

    return true 
  }

  function createLesson(lesson: Lesson): boolean {
    const response = {
      data: {
        id: '2',
        class: lesson.class,
        subject: lesson.subject,
        teacher: mockSummary[0].teacher
      }
    }

    summary.value.push(response.data)
    return true;
  }

  return {
    summary,

    getSummary,
    createLesson,
  }
})