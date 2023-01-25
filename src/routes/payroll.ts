import express from 'express'

import parseTime from '../functions/helpers/parseTime'
import { ConsolidateRecord, Payroll } from '../interfaces/types'
import { convertBaseSalary, calculateTimePeriod, createPeriod } from './helpers'
import { recordHours, period } from '../constants'
import dataEmployees from '../data/employees.json'
import dataWorkingDay from '../data/workingDay.json'
import { PeriodKind } from '../interfaces/period'
import diffDuration from '../functions/scripts/diffDuration'

const routerPayroll = express.Router()

routerPayroll.get('/', (_, res) => {
  // calculate payroll
  function calculatePayroll(consolidate: ConsolidateRecord[]): Payroll[] {
    // get start date and end date in the period
    const startDate = '2023-01-01'
    const endDate = '2023-01-16'

    // evaluate all employee time records in the period
    return consolidate.map((record) => {
      // get the employee salary base
      let baseSalary = 0
      let indexSchedule = 0
      let getWorkTime = '00:00:00'
      let workTime = 0

      const index = dataEmployees.findIndex(
        (employee) => record.personalID === employee.personalID
      )
      if (index >= 0) {
        baseSalary = dataEmployees[index].salary
      }

      const indexWorkingDay = dataWorkingDay.findIndex(
        (workingDay) => dataEmployees[index].workingDay === workingDay.name
      )

      if (indexWorkingDay >= 0) {
        indexSchedule = indexWorkingDay
      }

      // get work time in the period
      const indexPeriod = period.findIndex(
        (item) => dataEmployees[index].workingDay === item.workingDay
      )

      if (indexPeriod >= 0) {
        getWorkTime = calculateTimePeriod(period[indexPeriod].period)
      } else if (indexPeriod < 0) {
        // create new period
        const newPeriod: PeriodKind = createPeriod(
          dataWorkingDay[indexSchedule],
          startDate,
          endDate
        )

        // get work time in the period
        getWorkTime = calculateTimePeriod(newPeriod.period)

        // update periods
        period.push(newPeriod)
      }

      // parse time into seconds time
      workTime = parseTime(getWorkTime)

      // convert salary base to revenue time per seconds
      const { secondSalary } = convertBaseSalary(baseSalary)

      // parse worked time in to seconds
      const workedTime = parseTime(record.period)

      // get the absolute value of the work time minus the time worked
      const secondsTime = Math.abs(workTime - workedTime)

      // get missing time
      const missingTime = diffDuration(record.period, getWorkTime)
      const missingValue = parseTime(missingTime) * secondSalary
      const ordinaryIncome = baseSalary - missingValue

      console.log(
        { missingTime: missingTime },
        { getWorkTime: getWorkTime },
        { record: record.period }
      )

      // calculate income with the base salary minus value to missing time
      const income =
        Math.round((baseSalary - secondSalary * secondsTime) * 100) / 100

      // create employee payroll
      const employeePayroll: Payroll = {
        personalInformation: {
          personalId: dataEmployees[index].personalID,
          fullName: dataEmployees[index].surname.concat(
            ' ',
            dataEmployees[index].name
          ),
          identityCard: dataEmployees[index].identityCard,
          job: dataEmployees[index].job
        },
        paymentInformation: {
          paymentPeriod: getWorkTime,
          baseSalary: dataEmployees[index].salary
        },
        workDetail: {
          baseSalary: dataEmployees[index].salary,
          absenceTime: missingTime,
          absenceMount: missingValue,
          ordinaryIncome: ordinaryIncome
        },
        detailIncome: {
          ordynaryIncome: ordinaryIncome,
          grossIncome: ordinaryIncome
        },
        deductionDetail: {
          socialSecurity: 0,
          netDeducctions: 0
        },

        netIncome: income
      }

      return employeePayroll
    })
  }

  const result = calculatePayroll(recordHours)

  res.json(result)
})

export default routerPayroll
