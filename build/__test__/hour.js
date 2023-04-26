"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTime = exports.plusTime = exports.iterateDateArray = exports.calculateTime = exports.calculateDurationTime = exports.parseDate = exports.durationMath = exports.timeMath = void 0;
const luxon_1 = require("luxon");
const timeMath = (data) => {
    const first = luxon_1.DateTime.fromISO(data[0].FirstTime);
    const second = luxon_1.DateTime.fromISO(data[0].LastTime);
    const difTime = second.diff(first, ['hour', 'minutes', 'seconds']);
    return difTime.toFormat('hh:mm:ss');
};
exports.timeMath = timeMath;
const durationMath = (data) => {
    const first = luxon_1.Duration.fromISOTime(data[0].FirstDuration);
    const second = luxon_1.Duration.fromISOTime(data[0].SecondDuration);
    const difDuration = second.minus(first);
    return difDuration.toFormat('hh:mm:ss');
};
exports.durationMath = durationMath;
const parseDate = (date) => {
    return luxon_1.DateTime.fromISO(date).toJSDate();
};
exports.parseDate = parseDate;
const calculateDurationTime = (data) => {
    const result = data.map((item) => (Object.assign(Object.assign({}, item), { duration: (0, exports.calculateTime)(item.startTime, item.endTime) })));
    return result;
};
exports.calculateDurationTime = calculateDurationTime;
const calculateTime = (first, second) => {
    return luxon_1.Duration.fromISOTime(second)
        .minus(luxon_1.Duration.fromISOTime(first))
        .toFormat('hh:mm:ss');
};
exports.calculateTime = calculateTime;
const iterateDateArray = (data) => {
    const result = data.map((item) => data.filter((time) => time.date === item.date).length);
    return result;
};
exports.iterateDateArray = iterateDateArray;
const plusTime = (time) => {
    const result = time.reduce((acc, item) => {
        return acc.plus(luxon_1.Duration.fromISOTime(item.duration));
    }, luxon_1.Duration.fromObject({ hours: 0, minutes: 0, seconds: 0 }));
    return result.toFormat('hh:mm:ss');
};
exports.plusTime = plusTime;
const convertTime = (value) => {
    const result = luxon_1.Duration.fromISOTime(value).toFormat('ss');
    return result;
};
exports.convertTime = convertTime;
