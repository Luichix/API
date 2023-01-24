/**
 * Add two string time values (HH:mm:ss) with javascript
 *
 * Usage:
 *  > parseTime('10:10:10'')
 *  > 36610
 *
 * @param {String} time  String time format
 * @returns {number}
 */

export default function parseTime(time: string): number {
  const splitTime: string[] = time.split(':')

  const numberTime: number[] = []

  for (let i = 0; i < 3; i++) {
    numberTime[i] = isNaN(parseInt(splitTime[i])) ? 0 : parseInt(splitTime[i])
  }

  return numberTime.reduce((acc: number, item: number) => {
    return acc * 60 + item
  }, 0)
}
