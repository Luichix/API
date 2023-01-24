export interface HourRecord {
  startTime: string
  endTime: string
  duration: string
}

export type HourRecordWithoutDuration = Omit<HourRecord, 'duration'>
export type HourRecordWithOnlyDuration = Pick<HourRecord, 'duration'>

export interface TimeRecord {
  hoursID: string
  date: string
  personalID: string
  fullName: string
  totalHours: string
  hours: HourRecord[]
}

export interface ConsolidateRecord {
  personalID: string
  period: string
  records: TimeRecord[]
}

export interface Payroll {
  personalID: string
  income: number
}
