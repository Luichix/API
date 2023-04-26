"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hours_json_1 = __importDefault(require("../data/hours.json"));
const insertDurations_1 = __importDefault(require("../functions/insertDurations"));
const sumDurations_1 = __importDefault(require("../functions/sumDurations"));
const routerHours = express_1.default.Router();
// get all time record
routerHours.get('/', (_, res) => {
    res.send(hours_json_1.default);
});
// get only time record by employee
routerHours.get('/:id', (req, res) => {
    const id = req.params.id;
    const resultados = hours_json_1.default.filter((employee) => employee.personalID === id);
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontro el colaborador #${id}.`);
    }
    return res.json(resultados);
});
// create new employee time record
routerHours.post('/', (req, res) => {
    const timeRecord = req.body;
    const hours = (0, insertDurations_1.default)(timeRecord.hours);
    const totalHours = (0, sumDurations_1.default)(hours);
    const newTimeRecord = Object.assign(Object.assign({}, timeRecord), { hours: hours, totalHours: totalHours });
    hours_json_1.default.push(newTimeRecord);
    res.json(hours_json_1.default);
});
// update all employee time record information
routerHours.put('/:id', (req, res) => {
    const updatedEmployeeTimeRecord = req.body;
    const id = req.params.id;
    const index = hours_json_1.default.findIndex((employee) => employee.hoursID === id);
    if (index >= 0) {
        hours_json_1.default[index] = updatedEmployeeTimeRecord;
    }
    res.json(hours_json_1.default);
});
// update employee time record information
routerHours.patch('/:id', (req, res) => {
    const newInfo = req.body;
    const id = req.params.id;
    const index = hours_json_1.default.findIndex((employee) => employee.hoursID === id);
    if (index >= 0) {
        const employeeToUpdate = hours_json_1.default[index];
        Object.assign(employeeToUpdate, newInfo);
    }
    res.json(hours_json_1.default);
});
// Delete employee time record
routerHours.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = hours_json_1.default.findIndex((employee) => employee.hoursID === id);
    if (indice >= 0) {
        hours_json_1.default.splice(indice, 1);
    }
    res.json(hours_json_1.default);
});
exports.default = routerHours;
