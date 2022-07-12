import { timeMath, durationMath, parseDate, timeExecute, calculateDurationTime, iterateDateArray, plusTime } from './hour'
import data from './data.json'
import time from './time.json'
import plus from './plus.json'

describe('Time operations with format date and hour', () => {
  test('Calculate diference between two dates', () => {
    const result = timeExecute(timeMath, 'timeMath', data)
    expect(result).toBe('04:12:00')

    // Time Execute "timeMath": 18ms
  })

  test('Calculate diference between two hours', () => {
    const result = timeExecute(durationMath, 'durationMath', data)
    expect(result).toBe('02:15:00')

    // Time Execute "durationMath": 1ms
  })
  test('Parsea una fecha en formato ISO a una fecha en formato Date', () => {
    const result = timeExecute(parseDate, 'parseDate', '2022-04-01T06:00:00.000Z')
    expect(result).toEqual(new Date('2022-04-01T06:00:00.000Z'))

    // Time Execute parseDate: 15ms
  })

  test('Calculate diference in to array hours', () => {
    const result = timeExecute(calculateDurationTime, 'calculateDurationTime', time)
    expect(result).toHaveLength(21)

    // Time Execute calculateDurationTime: 22ms
  })

  test('Iterate array of dates', () => {
    const result = timeExecute(iterateDateArray, 'iterateDateArray', time)
    expect(result).not.toContain('1')

    // Time Execute iterateDateArray: 0ms
  })

  test('Plus array time', () => {
    const result = timeExecute(plusTime, 'plusTime', plus)
    expect(result).toBe('91:16:00')

    // Time Execute plusTime: 17ms
  })
})
