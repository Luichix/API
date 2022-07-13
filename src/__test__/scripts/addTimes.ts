/**
 * Add two string time values (HH:mm:ss) with javascript
 *
 * Usage:
 *  > addTimes('04:20:10', '21:15:10');
 *  > "25:35:20"
 *  > addTimes('04:35:10', '21:35:10');
 *  > "26:10:20"
 *  > addTimes('30:59', '17:10');
 *  > "48:09:00"
 *  > addTimes('19:30:00', '00:30:00');
 *  > "20:00:00"
 *
 * @param {String} startTime  String time format
 * @param {String} endTime  String time format
 * @returns {String}
 */

export default function addTimes (start: string, end: string): string {
  const times: number[] = []
  const times1: string[] = start.split(':')
  const times2: string[] = end.split(':')

  const startTime: number[] = []
  const endTime: number[] = []

  for (let i = 0; i < 3; i++) {
    startTime[i] = (isNaN(parseInt(times1[i]))) ? 0 : parseInt(times1[i])
    endTime[i] = (isNaN(parseInt(times2[i]))) ? 0 : parseInt(times2[i])
    times[i] = startTime[i] + endTime[i]
  }

  let seconds = times[2]
  let minutes = times[1]
  let hours = times[0]

  if (seconds >= 60) {
    const res = (seconds / 60) << 0
    minutes += res
    seconds -= 60 * res
  }

  if (minutes >= 60) {
    const res = (minutes / 60) << 0
    hours += res
    minutes -= 60 * res
  }

  return `${hours < 10 ? `0${hours}` : hours.toString()}:${minutes < 10 ? `0${minutes}` : minutes.toString()}:${seconds < 10 ? `0${seconds}` : seconds.toString()}`
}
