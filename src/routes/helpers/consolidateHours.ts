import addDuration from '../../functions/scripts/addDuration'
import { TimeRecord } from '../../interfaces/types'

export default function consolidateHours(time: TimeRecord[]): string {
  return time.reduce((acc: string, item) => {
    return addDuration(acc, item.totalHours)
  }, '00:00:00')
}
