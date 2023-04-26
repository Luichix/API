"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hours = exports.durations = exports.times = void 0;
var times_json_1 = require("./times.json");
Object.defineProperty(exports, "times", { enumerable: true, get: function () { return __importDefault(times_json_1).default; } });
var durations_json_1 = require("./durations.json");
Object.defineProperty(exports, "durations", { enumerable: true, get: function () { return __importDefault(durations_json_1).default; } });
var hours_json_1 = require("./hours.json");
Object.defineProperty(exports, "hours", { enumerable: true, get: function () { return __importDefault(hours_json_1).default; } });
