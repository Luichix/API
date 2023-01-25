export interface WorkingHours {
  entryTime: string
  departureTime: string
  time: string
}

export interface ScheduleDay {
  weekday: number
  hours: string
  entryTime: string
  departureTime: string
  restTime: string
  workingHours: WorkingHours[]
}

export interface WorkingDay {
  id: string
  name: string
  description: string
  weeklyHours: string
  weeklyShift: ScheduleDay[]
}

export interface PeriodDay {
  date: string
  day: string
  weekday: number
  workingHours: string
  holiday: boolean
  dayOff: boolean
  vacation: boolean
}

export interface PeriodKind {
  workingDay: string
  period: PeriodDay[]
}
