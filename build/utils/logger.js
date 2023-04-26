"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
    return undefined;
};
const error = (...params) => {
    console.error(...params);
    return undefined;
};
exports.default = {
    info,
    error
};
