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
Object.defineProperty(exports, "__esModule", { value: true });
const user_db_1 = require("./user_db");
const result = {
    status: 400,
    message: 'error',
    data: undefined
};
const checkCode = (id, code) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        if (!code) {
            result.status = 422;
            result.message = 'pls input code';
            reject(result);
            return;
        }
        user_db_1.User.findById({ _id: id }, 'email_authorization', (err, obj) => {
            if (err) {
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else if (obj.email_authorization.authorization_code !== code) {
                result.status = 422;
                result.message = 'wrong verification code';
                reject(result);
                return;
            }
            else {
                resolve(undefined);
            }
        });
    });
});
const emailAuthorize = (id, code, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkCode(id, code);
    yield user_db_1.User.findByIdAndUpdate(id, data);
    return;
});
exports.default = emailAuthorize;
//# sourceMappingURL=user_emailVerified.js.map