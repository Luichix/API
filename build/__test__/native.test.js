"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const timeExecute_1 = __importDefault(require("../functions/helpers/timeExecute"));
const parseTime_1 = __importDefault(require("../functions/helpers/parseTime"));
const addDuration_1 = __importDefault(require("../functions/scripts/addDuration"));
const diffDuration_1 = __importDefault(require("../functions/scripts/diffDuration"));
const sumDurations_1 = __importDefault(require("../functions/sumDurations"));
const insertDurations_1 = __importDefault(require("../functions/insertDurations"));
describe('Usign native functions to operations with hours', () => {
    test('Native functions add times', () => {
        const result = (0, timeExecute_1.default)(addDuration_1.default, 'addDuration', '10:00:00', '104:00:60');
        expect(result).toBe('114:01:00');
        // Time Execute addDuration: 0ms ***
    });
    test('Native functions diff times', () => {
        const result = (0, timeExecute_1.default)(diffDuration_1.default, 'diffDuration', '60:00:00', '104:00:60');
        expect(result).toBe('44:01:00');
        // Time Execute diffDuration: 0ms ***
    });
    test('Native functions plus array times', () => {
        const result = (0, timeExecute_1.default)(sumDurations_1.default, 'NativePlusTime', data_1.durations);
        expect(result).toBe('91:16:00');
        // Time Execute NativePlusTime: 0ms ***
    });
    test('Native functions diff array times', () => {
        const result = (0, timeExecute_1.default)(insertDurations_1.default, 'NativeDurationTime', data_1.hours);
        expect(result).toHaveLength(21);
        // Time Execute NativeDiffTime: 0ms ***
    });
});
describe('Time Operations between hours and values', () => {
    const monthlySalary = 6000;
    const dialySalary = monthlySalary / 30;
    const hourlySalary = dialySalary / 8;
    const minuteSalary = hourlySalary / 60;
    const secondSalary = minuteSalary / 60;
    test('Native functions to parse duration to basic metric unit', () => {
        const result = (0, timeExecute_1.default)(parseTime_1.default, 'ParseTime', '00:00:60');
        expect(result).toBe(60);
        // Time Execute ParseTime: 0ms
    });
    test('Native functions to calculate cost of working time', () => {
        const workTime = (0, timeExecute_1.default)(parseTime_1.default, 'ParseTime', '08:00:00');
        const result = secondSalary * parseInt(workTime);
        expect(result).toBe(200);
        // Time Execute ParseTime: 0ms
    });
    test('Native functions to payment of working time', () => {
        const workTime = (0, parseTime_1.default)('104:00:00');
        const workedTime = (0, sumDurations_1.default)(data_1.durations);
        const secondsTime = Math.abs(workTime - (0, parseTime_1.default)(workedTime));
        const result = monthlySalary - secondSalary * secondsTime;
        expect(Math.round(result)).toBe(5682);
    });
});
