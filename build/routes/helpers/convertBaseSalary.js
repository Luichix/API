"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertBaseSalary(salaryBase) {
    const dialySalary = salaryBase / 30;
    const hourlySalary = dialySalary / 8;
    const minuteSalary = hourlySalary / 60;
    const secondSalary = minuteSalary / 60;
    return {
        dialySalary,
        hourlySalary,
        minuteSalary,
        secondSalary
    };
}
exports.default = convertBaseSalary;
