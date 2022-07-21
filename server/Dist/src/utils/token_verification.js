"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token_verification = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const development_config_1 = require("../config/development_config");
const result = {
    status: 400,
    message: 'error',
    data: undefined
};
let verify = {};
const verification = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const time = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
        if (!token) {
            result.status = 403;
            result.message = 'missing token';
            reject(result);
            return;
        }
        if (token) {
            jsonwebtoken_1.default.verify(token, development_config_1.env.secret, (err, decoded) => {
                if (err) {
                    verify = false;
                    resolve(verify);
                }
                else if (decoded.exp <= time) {
                    verify = false;
                    resolve(verify);
                }
                else {
                    verify = decoded.data;
                    resolve(verify);
                }
            });
        }
    });
});
const tokenCheck = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        if (!token) {
            result.status = 401;
            result.message = 'token unauthorized';
            reject(result);
            return;
        }
        else {
            resolve(token);
        }
    });
});
const token_verification = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tokenCheck(yield verification(token));
    return result;
});
exports.token_verification = token_verification;
//# sourceMappingURL=token_verification.js.map