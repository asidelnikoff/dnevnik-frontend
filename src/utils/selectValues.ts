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
    value: 'Учитель',
    label: 'Учитель',
  }
]

export const timeSelectValues: SelectItem[] = [
  {
    value: '8:00-8:45',
    label: '8:00-8:45',
  },
]

export const daysSelectValues: SelectItem[] = [
  {
    value: 'Понедельник',
    label: 'Понедельник',
  },
  {
    value: 'Вторник',
    label: 'Вторник',
  },
  {
    value: 'Среда',
    label: 'Среда',
  },
  {
    value: 'Четверг',
    label: 'Четверг',
  },
  {
    value: 'Пятница',
    label: 'Пятница',
  },
  {
    value: 'Суббота',
    label: 'Суббота',
  },
]