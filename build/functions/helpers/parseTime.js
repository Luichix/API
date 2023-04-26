"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function parseTime(time) {
    const splitTime = time.split(':');
    const numberTime = [];
    for (let i = 0; i < 3; i++) {
        numberTime[i] = isNaN(parseInt(splitTime[i])) ? 0 : parseInt(splitTime[i]);
    }
    return numberTime.reduce((acc, item) => {
        return acc * 60 + item;
    }, 0);
}
exports.default = parseTime;
