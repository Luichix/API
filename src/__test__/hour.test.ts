import { timeMath, durationMath, parseDate, calculateDurationTime, iterateDateArray, plusTime, convertTime } from './hour'
import { object as dataObject, plus as dataPlus, time as dataTime } from './data'
import { timeExecute } from './scripts'

describe('Time operations with format date and hour', () => {
  test('Parsea una fecha en formato ISO a una fecha en formato Date', () => {
    const result = timeExecute(parseDate, 'parseDate', '2022-04-01T06:00:00.000Z')
    expect(result).toEqual(new Date('2022-04-01T06:00:00.000Z'))
    // Time Execute parseDate: 15ms *
  })

  test('Calculate diference between two dates', () => {
    const result = timeExecute(timeMath, 'timeMath', dataObject)
    expect(result).toBe('04:12:00')
    // Time Execute "timeMath": 18ms *
  })

  test('Calculate diference between two hours', () => {
    const result = timeExecute(durationMath, 'durationMath', dataObject)
    expect(result).toBe('02:15:00')
    // Time Execute "durationMath": 1ms ***
  })

  test('Calculate diference in to array hours', () => {
    const result = timeExecute(calculateDurationTime, 'calculateDurationTime', dataTime)
    expect(result).toHaveLength(21)
    // Time Execute calculateDurationTime: 22ms ***
  })

  test('Iterate array of dates', () => {
    const result = timeExecute(iterateDateArray, 'iterateDateArray', dataTime)
    expect(result).not.toContain('1')

    // Time Execute iterateDateArray: 0ms *
  })

  test('Plus array time', () => {
    const result = timeExecute(plusTime, 'plusTime', dataPlus)
    expect(result).toBe('91:16:00')

    // Time Execute plusTime: 17ms ***
  })
})

describe('Time Operations between hours and values', () => {
  const monthlySalary = 6000
  const dialySalary = monthlySalary / 30
  const hourlySalary = dialySalary / 8
  const minuteSalary = hourlySalary / 60
  const secondSalary = minuteSalary / 60

  test('Convert duration to basic metric unit', () => {
    const result = timeExecute(convertTime, 'ConverTime', '00:00:60')
    expect(result).toBe('60')

    // Time Execute ConverTime: 18ms
  })

  test('Cost of working time', () => {
    const workTime = timeExecute(convertTime, 'ConverTime', '08:00:00')
    const result = secondSalary * parseInt(workTime)
    expect(result).toBe(200)

    // Time Execute ConverTime: 16ms
  })

  test('Payment of working time', () => {
    const workTime = convertTime('99:00:00')
    // const workedTime = convertTime('96:00:00')

    const result = workTime
    expect(result).toBe(200)
  })
})
