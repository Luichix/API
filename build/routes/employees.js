"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employees_json_1 = __importDefault(require("../data/employees.json"));
const routerEmployees = express_1.default.Router();
// get all employees information
routerEmployees.get('/', (_, res) => {
    res.json(employees_json_1.default);
});
// create new employee
routerEmployees.post('/', (req, res) => {
    const newEmployee = req.body;
    employees_json_1.default.push(newEmployee);
    res.json(employees_json_1.default);
});
// update all employee information
routerEmployees.put('/:id', (req, res) => {
    const updatedEmployee = req.body;
    const id = req.params.id;
    const index = employees_json_1.default.findIndex((employee) => employee.personalID === id);
    if (index >= 0) {
        employees_json_1.default[index] = updatedEmployee;
    }
    res.json(employees_json_1.default);
});
// update employee information
routerEmployees.patch('/:id', (req, res) => {
    const newInfo = req.body;
    const id = req.params.id;
    const index = employees_json_1.default.findIndex((employee) => employee.personalID === id);
    if (index >= 0) {
        const employeeToUpdate = employees_json_1.default[index];
        Object.assign(employeeToUpdate, newInfo);
    }
    res.json(employees_json_1.default);
});
// delete employee
routerEmployees.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = employees_json_1.default.findIndex((employee) => employee.personalID === id);
    if (indice >= 0) {
        employees_json_1.default.splice(indice, 1);
    }
    res.json(employees_json_1.default);
});
exports.default = routerEmployees;
