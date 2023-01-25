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
  totalHours: string
  hours: HourRecord[]
}

export interface ConsolidateRecord {
  personalID: string
  period: string
  records: TimeRecord[]
}

export interface PersonalInformation {
  personalId: string
  name: string
  surname: string
  identityCard: string
  typeCard: string
  job: string
}

export interface PaymentInformation {
  paymentPeriod: string
  baseSalary: number
}

export interface PersonalInformationForPayment
  extends Pick<PersonalInformation, 'personalId' | 'identityCard' | 'job'> {
  fullName: string
}

export interface WorkDetail {
  baseSalary: number
  absenceTime: string
  absenceMount: number
  ordinaryIncome: number
}
export interface DetailIncome {
  ordynaryIncome: number
  grossIncome: number
}
export interface DeductionDetail {
  socialSecurity: number
  netDeducctions: number
}

export interface Payroll {
  personalInformation: PersonalInformationForPayment
  netIncome: number
  paymentInformation: PaymentInformation
  workDetail: WorkDetail
  detailIncome: DetailIncome
  deductionDetail: DeductionDetail
}
