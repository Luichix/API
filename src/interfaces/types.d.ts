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
  personalInformation: PersonalInformationForPayment
  netIncome: number
}

export interface PersonalInformation {
  personalId: string
  name: string
  surname: string
  identityCard: string
  typeCard: string
  job: string
}

export interface PersonalInformationForPayment
  extends Pick<PersonalInformation, 'personalId' | 'identityCard' | 'job'> {
  fullName: string
}
