"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addDuration_1 = __importDefault(require("./scripts/addDuration"));
const sumDurations = (time) => {
    return time.reduce((acc, item) => {
        return (0, addDuration_1.default)(acc, item.duration);
    }, '00:00:00');
};
exports.default = sumDurations;
