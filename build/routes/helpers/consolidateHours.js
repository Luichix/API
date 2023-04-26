"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addDuration_1 = __importDefault(require("../../functions/scripts/addDuration"));
function consolidateHours(time) {
    return time.reduce((acc, item) => {
        return (0, addDuration_1.default)(acc, item.totalHours);
    }, '00:00:00');
}
exports.default = consolidateHours;
