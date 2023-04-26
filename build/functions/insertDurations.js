"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diffDuration_1 = __importDefault(require("./scripts/diffDuration"));
const insertDurations = (data) => {
    return data.map((item) => (Object.assign(Object.assign({}, item), { duration: (0, diffDuration_1.default)(item.startTime, item.endTime) })));
};
exports.default = insertDurations;
