import { HourRecordWithOnlyDuration } from '../interfaces/types'
import addDuration from './scripts/addDuration'

const sumDurations = (time: HourRecordWithOnlyDuration[]): string => {
  return time.reduce((acc: any, item: any) => {
    return addDuration(acc, item.duration)
  }, '00:00:00')
}

export default sumDurations
