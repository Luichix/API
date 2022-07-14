import { timeExecute, addTimes, diffTimes, parseTime } from './scripts'
import { nativeAddTimes, nativeDurationTime } from './native'
import { plus as dataPlus, time as dataTime } from './data'

describe('Usign native functions to operations with hours', () => {
  test('Native functions add times', () => {
    const result = timeExecute(addTimes, 'addTimes', '00:00:00', '104:00:60')
    expect(result).toBe('104:01:00')
    // Time Execute addTimes: 0ms ***
  })

  test('Native functions diff times', () => {
    const result = timeExecute(diffTimes, 'diffTimes', '00:00:00', '104:00:60')
    expect(result).toBe('104:01:00')
    // Time Execute diffTimes: 0ms ***
  })

  test('Native functions plus array times', () => {
    const result = timeExecute(nativeAddTimes, 'NativePlusTime', dataPlus)
    expect(result).toBe('91:16:00')
    // Time Execute NativePlusTime: 0ms ***
  })

  test('Native functions diff array times', () => {
    const result = timeExecute(nativeDurationTime, 'NativeDurationTime', dataTime)
    expect(result).toHaveLength(21)
    // Time Execute NativeDiffTime: 0ms ***
  })
})

describe('Time Operations between hours and values', () => {
  const monthlySalary = 6000
  const dialySalary = monthlySalary / 30
  const hourlySalary = dialySalary / 8
  const minuteSalary = hourlySalary / 60
  const secondSalary = minuteSalary / 60

  test('Native functions to parse duration to basic metric unit', () => {
    const result = timeExecute(parseTime, 'ParseTime', '00:00:60')
    expect(result).toBe(60)

    // Time Execute ParseTime: 0ms
  })

  test('Native functions to calculate cost of working time', () => {
    const workTime = timeExecute(parseTime, 'ParseTime', '08:00:00')
    const result = secondSalary * parseInt(workTime)
    expect(result).toBe(200)

    // Time Execute ParseTime: 0ms
  })

  test('Native functions to payment of working time', () => {
    const workTime = parseTime('104:00:00')
    const workedTime = nativeAddTimes(dataPlus)
    const secondsTime = Math.abs(workTime - parseTime(workedTime))
    const result = monthlySalary - (secondSalary * secondsTime)
    expect(Math.round(result)).toBe(5682)
  })
})
