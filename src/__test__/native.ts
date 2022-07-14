import { addTimes, diffTimes } from './scripts'

export const nativeAddTimes = (time: any): string => {
  const result = time.reduce((acc: any, item: any) => {
    return addTimes(acc, item.duration)
  }
  , '00:00:00')
  return result
}

export const nativeDurationTime = (data: any): any[] => {
  const result: [] = data.map((item: any) => ({ ...item, duration: diffTimes(item.timeStart, item.timeEnd) }))
  return result
}
