export type SelectItem = {
  value: string,
  label: string
}

export const subjectSelectValues: SelectItem[] = [
  {
    value: 'Английский язык',
    label: 'Английский язык',
  },
  {
    value: 'Русский язык',
    label: 'Русский язык',
  },
  {
    value: 'Чтение',
    label: 'Чтение',
  },
  {
    value: 'Музыка',
    label: 'Чтение',
  },
  {
    value: 'Математика',
    label: 'Математика',
  },
  {
    value: 'Химия',
    label: 'Химия',
  },
  {
    value: 'Биология',
    label: 'Биология',
  },
  {
    value: 'История',
    label: 'История',
  },
  {
    value: 'Физкультура',
    label: 'Физкультура',
  },
  {
    value: 'ОБЖ',
    label: 'ОБЖ',
  },
  {
    value: 'Литература',
    label: 'Литература',
  },
  {
    value: 'ИЗО',
    label: 'ИЗО',
  },
  {
    value: 'Черчение',
    label: 'Черчение',
  },
].sort((a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase()));

const classTypes = ['А', 'Б', 'В']
export const classSelectValues: SelectItem[] = []
for (let i = 1; i <= 10; i++) {
  classTypes.forEach(type => {
    classSelectValues.push({
      value: i+type,
      label: i+type
    })
  })
}

export const roleSelectValues: SelectItem[] = [
  {
    value: 'teacher',
    label: 'Учитель',
  }
]

export const startTimeSelectValues: SelectItem[] = [
  {
    value: '08:00:00',
    label: '08:00',
  },
  {
    value: '08:50:00',
    label: '08:50',
  },
  {
    value: '09:50:00',
    label: '09:50',
  },
  {
    value: '10:50:00',
    label: '10:50',
  },
  {
    value: '11:50:00',
    label: '11:50',
  },
  {
    value: '12:40:00',
    label: '12:40',
  },
  {
    value: '13:40:00',
    label: '13:40',
  },
]
export const endTimesByStartTimes: Record<string, string> = {
  '08:00:00': '08:40:00',
  '08:50:00': '09:30:00',
  '09:50:00': '10:30:00',
  '10:50:00': '11:30:00',
  '11:50:00': '12:30:00',
  '12:40:00': '13:20:00',
  '13:40:00': '14:20:00',
}
export const getEndTimeByStartTime = (startTime: string) => endTimesByStartTimes[startTime]

export const gradeSelectValues: SelectItem[] = [
  {
    value: 'н',
    label: 'н',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
]

const weekDays: Record<string, string> = {
  'Понедельник': 'monday',
  'Вторник': 'tuesday',
  'Среда': 'wednesday',
  'Четверг': 'thursday',
  'Пятница': 'friday',
  'Суббота': 'saturday',
}
export function getApiWeekDay(weekDay: string): string {
  return weekDays[weekDay]
}
export const daysSelectValues: SelectItem[] = [
  {
    value: 'monday',
    label: 'Понедельник',
  },
  {
    value: 'tuesday',
    label: 'Вторник',
  },
  {
    value: 'wednesday',
    label: 'Среда',
  },
  {
    value: 'thursday',
    label: 'Четверг',
  },
  {
    value: 'friday',
    label: 'Пятница',
  },
  {
    value: 'saturday',
    label: 'Суббота',
  },
]