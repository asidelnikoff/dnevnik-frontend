
import type { Stuff } from '@/api/types/stuff';
import { defineStore } from 'pinia'
import { ref } from 'vue'

//
// Mock Stuff until backend is ready
//

const mockStuff: Stuff[] = [
  {
    id: '1',
    name: 'Иван',
    lastName: 'Иванов',
    middleName: 'Олегович',
    role: 'Учитель',
    subjects: ['Русский язык', 'Математика']
  }
] 

export const useStuffStore = defineStore('stuff', () => {
  const stuff = ref<Stuff[]>([]);

  function getStuff(): boolean{
    // TODO: change to server request
    const response = {
      data: mockStuff,
    }
    stuff.value = response.data

    return true 
  }

  return { stuff, getStuff}
})