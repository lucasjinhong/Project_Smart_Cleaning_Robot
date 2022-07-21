"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email_token = exports.token_create = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const development_config_1 = require("../config/development_config");
const token_create = (data) => {
    const token = jsonwebtoken_1.default.sign({
        algorithm: 'HS256',
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
    }, development_config_1.env.secret);
    return token;
};
exports.token_create = token_create;
const email_token = (data) => {
    const token = jsonwebtoken_1.default.sign({
        algorithm: 'HS256',
        exp: Math.floor(Date.now() / 1000) + (60 * 10),
        data: data
    }, development_config_1.env.secret);
    return token;
};
exports.email_token = email_token;
//# sourceMappingURL=token_create.js.map