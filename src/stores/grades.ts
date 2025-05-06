import { ref } from 'vue';
import scheduleService, { type GetScheduleGradesResponse } from './../api/services/scheduleService';
import { defineStore } from "pinia";
import type { Response } from '@/api/types/response';
import type { Grade } from '@/api/types/shedule';

export const useGradesStore = defineStore('grades', () => {
  const gradeItems = ref<GetScheduleGradesResponse>([])

  async function getScheduleGrades(id: string): Promise<Response<GetScheduleGradesResponse>> {
    const response = await scheduleService.getScheduleGrades(id)
    gradeItems.value = response.data
    return response
  }

  function findGradeItemByStudentId(studentId: string): GetScheduleGradesResponse[number] | undefined {
    return gradeItems.value.find(gradeItem => gradeItem.student.id === studentId)
  }

  function deleteGrade(studentId: string, gradeId: number): void {
    gradeItems.value = gradeItems.value.map(gradeItem => {
      if (gradeItem.student.id === studentId) {
        gradeItem.grades = gradeItem.grades.filter((grade, id) => {
          return id !== gradeId
        })
      }
      return gradeItem
    })
  }

  function addGrade(studentId: string, grade: Grade): void {
    gradeItems.value = gradeItems.value.map(gradeItem => {
      if (gradeItem.student.id === studentId) {
        gradeItem.grades.push(grade)
      }
      return gradeItem
    })
  }

  function updateGrade(studentId: string, gradeId: number, grade: Grade): void {
    gradeItems.value = gradeItems.value.map(gradeItem => {
      if (gradeItem.student.id === studentId) {
        gradeItem.grades = gradeItem.grades.map((g, id) => {
          if (id === gradeId) {
            g = grade
          }
          return g
        })
      }
      return gradeItem
    })
  }

  async function saveGrades(scheduleId: string): Promise<Response<undefined>> {
    const response = await scheduleService.saveScheduleGrades(scheduleId, gradeItems.value.map(gradeItem => {
      return {
        student_id: gradeItem.student.id,
        grades: gradeItem.grades.map(gradeItem => {
          return {
            grade: String(gradeItem.grade),
            comment: gradeItem.comment
          }
        })
      }
    }))
    return response
  }

  return {
    gradeItems,
    findGradeItemByStudentId,

    deleteGrade,
    addGrade,
    updateGrade,

    saveGrades,
    getScheduleGrades,
  }
})