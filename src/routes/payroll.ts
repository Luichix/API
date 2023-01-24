import express from 'express'

import { recordHours } from '../constants/recordHours'
import { ConsolidateRecord, Payroll } from '../interfaces/types'
import parseTime from '../functions/helpers/parseTime'
// import sumDurations from '../functions/sumDurations'

const routerPayroll = express.Router()

routerPayroll.get('/', (_, res) => {
  const calculatePayroll = (consolidate: ConsolidateRecord[]): Payroll[] => {
    const monthlySalary = 6000
    const dialySalary = monthlySalary / 30
    const hourlySalary = dialySalary / 8
    const minuteSalary = hourlySalary / 60
    const secondSalary = minuteSalary / 60
    const workTime = parseTime('104:00:00')

    return consolidate.map((record) => {
      const workedTime = parseTime(record.period)

      const secondsTime = Math.abs(workTime - workedTime)

      const income = monthlySalary - secondSalary * secondsTime
      return {
        personalID: record.personalID,
        income: income
      }
    })
  }

  const result = calculatePayroll(recordHours)

  res.send(result)
})

export default routerPayroll
