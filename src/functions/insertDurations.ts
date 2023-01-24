import { HourRecord, HourRecordWithoutDuration } from '../interfaces/types'
import diffDuration from './scripts/diffDuration'

const insertDurations = (data: HourRecordWithoutDuration[]): HourRecord[] => {
  return data.map((item) => ({
    ...item,
    duration: diffDuration(item.startTime, item.endTime)
  }))
}

export default insertDurations
