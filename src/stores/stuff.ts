
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
    subject: 'Русский язык',
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

  function addStuff (stuffData: Stuff): boolean {
    stuff.value.push(stuffData)

    return true
  }

  return {
    stuff,

    getStuff,
    addStuff
  }
})