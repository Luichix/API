import { DateTime, Duration } from 'luxon'

export const timeMath = (data: any): string => {
  const first = DateTime.fromISO(data[0].FirstTime)
  const second = DateTime.fromISO(data[0].LastTime)
  const difTime = second.diff(first, ['hour', 'minutes', 'seconds'])
  return difTime.toFormat('hh:mm:ss')
}

export const durationMath = (data: any): string => {
  const first = Duration.fromISOTime(data[0].FirstDuration)
  const second = Duration.fromISOTime(data[0].SecondDuration)

  const difDuration = second.minus(first)
  return difDuration.toFormat('hh:mm:ss')
}

export const parseDate = (date: string): Date => {
  return DateTime.fromISO(date).toJSDate()
}

export const calculateDurationTime = (data: any): any[] => {
  const result: [] = data.map((item: any) => ({
    ...item,
    duration: calculateTime(item.startTime, item.endTime)
  }))
  return result
}

export const calculateTime = (first: any, second: any): string => {
  return Duration.fromISOTime(second)
    .minus(Duration.fromISOTime(first))
    .toFormat('hh:mm:ss')
}

export const iterateDateArray = (data: any): any[] => {
  const result: [] = data.map(
    (item: any) => data.filter((time: any) => time.date === item.date).length
  )
  return result
}

export const plusTime = (time: []): string => {
  const result = time.reduce((acc: any, item: any) => {
    return acc.plus(Duration.fromISOTime(item.duration))
  }, Duration.fromObject({ hours: 0, minutes: 0, seconds: 0 }))
  return result.toFormat('hh:mm:ss')
}

export const convertTime = (value: any): string => {
  const result = Duration.fromISOTime(value).toFormat('ss')
  return result
}
