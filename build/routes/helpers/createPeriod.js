"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const parseTime_1 = __importDefault(require("../../functions/helpers/parseTime"));
dayjs_1.default.extend(utc_1.default);
function createPeriod(workingDay, startPeriod, endPeriod) {
    const startDate = new Date(startPeriod);
    const endDate = new Date(endPeriod);
    const diffTime = endDate.getTime() - startDate.getTime();
    const daysApart = diffTime / (1000 * 60 * 60 * 24);
    const newPeriod = Array(daysApart)
        .fill({ id: 0 })
        .map((_, index) => {
        const date = dayjs_1.default.utc(startDate).clone().add(index, 'day');
        const weekday = date.day();
        const periodDay = {
            date: date.toISOString(),
            day: date.format('D'),
            weekday: date.day(),
            workingHours: workingDay.weeklyShift[weekday].hours,
            dayOff: (0, parseTime_1.default)(workingDay.weeklyShift[weekday].hours) === 0,
            holiday: false,
            vacation: false
        };
        return periodDay;
    });
    return [
        {
            workingDay: workingDay.name,
            period: newPeriod
        }
    ];
}
exports.default = createPeriod;
