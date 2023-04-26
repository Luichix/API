"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeExecute = (fn, name, ...params) => {
    const start = Date.now();
    const result = fn(...params);
    const end = Date.now();
    console.log(`Time Execute ${name}: ${end - start}ms`);
    return result;
};
exports.default = timeExecute;
