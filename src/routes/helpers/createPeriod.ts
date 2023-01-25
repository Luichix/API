import { PeriodDay, PeriodKind, WorkingDay } from '../../interfaces/period'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import parseTime from '../../functions/helpers/parseTime'
dayjs.extend(utc)

export default function createPeriod(
  workingDay: WorkingDay,
  startPeriod: string,
  endPeriod: string
): PeriodKind {
  const startDate = new Date(startPeriod)
  const endDate = new Date(endPeriod)

  const diffTime = endDate.getTime() - startDate.getTime()

  const daysApart = diffTime / (1000 * 60 * 60 * 24)

  const newPeriod: PeriodDay[] = Array(daysApart)
    .fill({ id: 0 })
    .map((_, index) => {
      const date = dayjs.utc(startDate).clone().add(index, 'day')

      const weekday = date.day()

      const periodDay = {
        date: date.toISOString(),
        day: date.format('D'),
        weekday: date.day(),
        workingHours: workingDay.weeklyShift[weekday].hours,
        dayOff: parseTime(workingDay.weeklyShift[weekday].hours) === 0,
        holiday: false,
        vacation: false
      }

      return periodDay
    })

  return {
    workingDay: workingDay.name,
    period: newPeriod
  }
}
