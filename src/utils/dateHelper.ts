import {
  DateFormatter,
} from '@internationalized/date'

const df = new DateFormatter('ru-RU', {
  dateStyle: 'short',
})

export function getDateString(date: Date): string {
  return df.format(date)
}

const dayNames = ["Пятница", "Суббота", "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг"];
const monthsNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

export function getScheduleTableHeader(dateString: string): string {
  const day = Number(dateString.split('.')[0])
  const month = Number(dateString.split('.')[1])
  const year = Number(dateString.split('.')[2])

  const date = new Date(year, month, day)
  const weekDay = date.getDay()
  const monthName = monthsNames[month - 1]
  return `${dayNames[weekDay]}, ${day} ${monthName}`
}