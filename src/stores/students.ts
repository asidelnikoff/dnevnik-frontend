import type { Student } from '@/api/types/student';
import { defineStore } from 'pinia'
import { ref } from 'vue'

//
// Mock Students until backend is ready
//

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Иван',
    lastName: 'Иванов',
    class: '10А',
  }
] 

export const useStudentsStore = defineStore('students', () => {
  const students = ref<Student[]>([]);

  function getStudents(): boolean{
    // TODO: change to server request
    const response = {
      data: mockStudents,
    }
    students.value = response.data

    return true 
  }

  function addStudent (studentData: Student): boolean {
    students.value.push(studentData)

    return true
  }

  return {
    students, 

    getStudents,
    addStudent,
  }
})