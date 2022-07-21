"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.async_catch = void 0;
require("express-async-errors");
const async_catch = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};
exports.async_catch = async_catch;
//# sourceMappingURL=async_catch.js.map