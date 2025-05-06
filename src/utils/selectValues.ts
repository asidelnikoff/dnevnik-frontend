export type SelectItem = {
  value: string,
  label: string
}

export const subjectSelectValues: SelectItem[] = [
  {
    value: 'Русский язык',
    label: 'Русский язык',
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
];

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
export const endTimeSelectValues: SelectItem[] = [
  {
    value: '08:40:00',
    label: '08:40',
  },
  {
    value: '09:30:00',
    label: '09:30',
  },
  {
    value: '10:30:00',
    label: '10:30',
  },
  {
    value: '11:30:00',
    label: '11:30',
  },
  {
    value: '12:30:00',
    label: '12:30',
  },
  {
    value: '13:20:00',
    label: '13:20',
  },
  {
    value: '14:20:00',
    label: '14:20',
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