import {
  DateFormatter,
} from '@internationalized/date'

const df = new DateFormatter('ru-RU', {
  dateStyle: 'short',
})

export function getDateString(date: Date): string {
  return df.format(date)
}

const dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const monthsNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

export function getScheduleTableHeader(dateString: string): string {
  const day = Number(dateString.split('.')[0])
  const month = Number(dateString.split('.')[1])
  const year = Number(dateString.split('.')[2])

  const date = new Date(year, month - 1, day)
  const weekDay = date.getDay()
  const monthName = monthsNames[month - 1]
  return `${dayNames[weekDay]}, ${day} ${monthName}`
}

export function transformApiDateToWeekDay(dateString: string) {
  const parts = dateString.split('-')
  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])

  const date = new Date(year, month - 1, day)
  const weekDay = date.getDay()

  return `${dayNames[weekDay]} (${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')})`
}