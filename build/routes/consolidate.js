"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hours_json_1 = __importDefault(require("../data/hours.json"));
const helpers_1 = require("./helpers");
const constants_1 = require("../constants");
// import { consolidateHours } from './helpers/consolidateHours'
const routerConsolidate = express_1.default.Router();
routerConsolidate.get('/', (_, res) => {
    // Del registro de horas
    // Mostrar el total de tiempo trabajado en el periodo
    const consolidateRecord = (records) => {
        const consolidateArray = [];
        for (let i = 0; i < records.length; i++) {
            const index = consolidateArray.findIndex((employee) => employee.personalID === records[i].personalID);
            if (index >= 0) {
                consolidateArray[index].records.push(records[i]);
            }
            else {
                consolidateArray.push({
                    personalID: records[i].personalID,
                    period: '',
                    records: [records[i]]
                });
            }
        }
        return consolidateArray;
    };
    const result = consolidateRecord(hours_json_1.default).map((record) => {
        return Object.assign(Object.assign({}, record), { period: (0, helpers_1.consolidateHours)(record.records) });
    });
    constants_1.recordHours.push(...result);
    res.send(result);
});
exports.default = routerConsolidate;
