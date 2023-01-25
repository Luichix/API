import addDuration from '../../functions/scripts/addDuration'
import { PeriodDay } from '../../interfaces/period'

export default function calculateTimePeriod(period: PeriodDay[]): string {
  return period.reduce((acc, item) => {
    return addDuration(acc, item.workingHours)
  }, '00:00:00')
}
