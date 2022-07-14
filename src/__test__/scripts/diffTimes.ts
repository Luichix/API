/**
 * Add two string time values (HH:mm:ss) with javascript
 *
 * Usage:
 *  > diffTimes('10:00:00', '15:30:00')
 *  > "05:30:00"
 *  > diffTimes('10:30:30', '06:50:00')
 *  > "00:00:00"
 *  > diffTimes('04:20:10', '21:15:20')
 *  > "16:55:00"
 *  > diffTimes('04:35:10', '21:35:30')
 *  > "17:00:20"
 *  > diffTimes('25:00:00', '00:00:00')
 *  > "00:00:00"
 *  > diffTimes('17:10', '30:59')
 *  > "13:49:00"
 *
 * @param {String} startTime  String time format
 * @param {String} endTime  String time format
 * @returns {String}
 */

export default function diffTimes (start: string, end: string): string {
  const times: number[] = []
  const times1: string[] = start.split(':')
  const times2: string[] = end.split(':')

  const startTime: number[] = []
  const endTime: number[] = []

  for (let i = 0; i < 3; i++) {
    startTime[i] = (isNaN(parseInt(times1[i]))) ? 0 : parseInt(times1[i])
    endTime[i] = (isNaN(parseInt(times2[i]))) ? 0 : parseInt(times2[i])
    times[i] = endTime[i] - startTime[i]
  }

  let seconds = times[2]
  let minutes = times[1]
  let hours = times[0]

  if (seconds >= 60) {
    const dif = (seconds / 60) << 0
    minutes += dif
    seconds -= 60 * dif
  } else if (seconds < 0) {
    const dif = Math.ceil(Math.abs(seconds / 60))
    minutes -= dif
    seconds += 60 * dif
  }

  if (minutes >= 60) {
    const dif = (minutes / 60) << 0
    hours += dif
    minutes -= 60 * dif
  } else if (minutes < 0) {
    const dif = Math.ceil(Math.abs(minutes / 60))
    hours -= dif
    minutes += 60 * dif
  }
  if (hours < 0) return '00:00:00'

  return `${hours < 10 && hours >= 0 ? `0${hours}` : hours.toString()}:${minutes < 10 ? `0${minutes}` : minutes.toString()}:${seconds < 10 ? `0${seconds}` : seconds.toString()}`
}

console.log(diffTimes('10:00:00', '15:30:00'))
// '05:30:00'
console.log(diffTimes('10:30:30', '06:50:00'))
// '00:00:00'
console.log(diffTimes('04:20:10', '21:15:20'))
// '16:55:00'
console.log(diffTimes('04:35:10', '21:35:30'))
// '17:00:20'
