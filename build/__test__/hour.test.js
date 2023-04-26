"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hour_1 = require("./hour");
const data_1 = require("./data");
const timeExecute_1 = __importDefault(require("../functions/helpers/timeExecute"));
describe('Time operations with format date and hour', () => {
    test('Parsea una fecha en formato ISO a una fecha en formato Date', () => {
        const result = (0, timeExecute_1.default)(hour_1.parseDate, 'parseDate', '2022-04-01T06:00:00.000Z');
        expect(result).toEqual(new Date('2022-04-01T06:00:00.000Z'));
        // Time Execute parseDate: 15ms *
    });
    test('Calculate diference between two dates', () => {
        const result = (0, timeExecute_1.default)(hour_1.timeMath, 'timeMath', data_1.times);
        expect(result).toBe('04:12:00');
        // Time Execute "timeMath": 18ms *
    });
    test('Calculate diference between two hours', () => {
        const result = (0, timeExecute_1.default)(hour_1.durationMath, 'durationMath', data_1.times);
        expect(result).toBe('02:15:00');
        // Time Execute "durationMath": 1ms ***
    });
    test('Calculate diference in to array hours', () => {
        const result = (0, timeExecute_1.default)(hour_1.calculateDurationTime, 'calculateDurationTime', data_1.hours);
        expect(result).toHaveLength(21);
        // Time Execute calculateDurationTime: 22ms ***
    });
    test('Iterate array of dates', () => {
        const result = (0, timeExecute_1.default)(hour_1.iterateDateArray, 'iterateDateArray', data_1.hours);
        expect(result).not.toContain('1');
        // Time Execute iterateDateArray: 0ms *
    });
    test('Plus array time', () => {
        const result = (0, timeExecute_1.default)(hour_1.plusTime, 'plusTime', data_1.durations);
        expect(result).toBe('91:16:00');
        // Time Execute plusTime: 17ms ***
    });
});
describe('Time Operations between hours and values', () => {
    const monthlySalary = 6000;
    const dialySalary = monthlySalary / 30;
    const hourlySalary = dialySalary / 8;
    const minuteSalary = hourlySalary / 60;
    const secondSalary = minuteSalary / 60;
    test('Convert duration to basic metric unit', () => {
        const result = (0, timeExecute_1.default)(hour_1.convertTime, 'ConverTime', '00:00:60');
        expect(result).toBe('60');
        // Time Execute ConverTime: 18ms
    });
    test('Cost of working time', () => {
        const workTime = (0, timeExecute_1.default)(hour_1.convertTime, 'ConverTime', '08:00:00');
        const result = secondSalary * parseInt(workTime);
        expect(result).toBe(200);
        // Time Execute ConverTime: 16ms
    });
    test('Payment of working time', () => {
        const workTime = (0, hour_1.convertTime)('99:00:00');
        // const workedTime = convertTime('96:00:00')
        const result = workTime;
        expect(result).toBe('356400');
    });
});
