"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parseTime_1 = __importDefault(require("../functions/helpers/parseTime"));
const helpers_1 = require("./helpers");
const constants_1 = require("../constants");
const employees_json_1 = __importDefault(require("../data/employees.json"));
const workingDay_json_1 = __importDefault(require("../data/workingDay.json"));
const routerPayroll = express_1.default.Router();
routerPayroll.get('/', (_, res) => {
    // calculate payroll
    function calculatePayroll(consolidate) {
        // get start date and end date in the period
        const startDate = '2023-01-01';
        const endDate = '2023-01-16';
        // evaluate all employee time records in the period
        return consolidate.map((record) => {
            // get the employee salary base
            let baseSalary = 0;
            let indexSchedule = 0;
            let getWorkTime = '00:00:00';
            const index = employees_json_1.default.findIndex((employee) => record.personalID === employee.personalID);
            if (index >= 0) {
                baseSalary = employees_json_1.default[index].salary;
            }
            const indexWorkingDay = workingDay_json_1.default.findIndex((workingDay) => employees_json_1.default[index].workingDay === workingDay.name);
            if (indexWorkingDay >= 0) {
                indexSchedule = indexWorkingDay;
            }
            // get work time in the period
            const indexPeriod = constants_1.period.findIndex((item) => employees_json_1.default[index].workingDay === item.workingDay);
            if (indexPeriod >= 0) {
                getWorkTime = (0, helpers_1.calculateTimePeriod)(constants_1.period[indexPeriod].period);
            }
            else {
                // get the working days in the period
                constants_1.period.push(...(0, helpers_1.createPeriod)(workingDay_json_1.default[indexSchedule], startDate, endDate));
            }
            // parse time into seconds time
            const workTime = (0, parseTime_1.default)(getWorkTime);
            // convert salary base to revenue time per seconds
            const { secondSalary } = (0, helpers_1.convertBaseSalary)(baseSalary);
            // parse worked time in to seconds
            const workedTime = (0, parseTime_1.default)(record.period);
            // get the absolute value of the work time minus the time worked
            const secondsTime = Math.abs(workTime - workedTime);
            // calculate income with the base salary minus value to missing time
            const income = Math.round((baseSalary - secondSalary * secondsTime) * 100) / 100;
            // create employee payroll
            const employeePayroll = {
                personalInformation: {
                    personalId: employees_json_1.default[index].personalID,
                    fullName: employees_json_1.default[index].surname.concat(' ', employees_json_1.default[index].name),
                    identityCard: employees_json_1.default[index].identityCard,
                    job: employees_json_1.default[index].job
                },
                netIncome: income
            };
            return employeePayroll;
        });
    }
    const result = calculatePayroll(constants_1.recordHours);
    res.json(result);
});
exports.default = routerPayroll;
