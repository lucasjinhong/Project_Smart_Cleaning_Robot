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
const user_db_1 = require("../model/user_db");
const result = {
    status: 400,
    message: 'error',
    data: undefined
};
const loginCheck = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        user_db_1.User.findOne({ email: email, password: password }, (err, obj) => {
            if (err) {
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if (!obj) {
                result.status = 401;
                result.message = 'login failed';
                reject(result);
            }
            else if (!obj.email_authorization.authorized) {
                result.status = 403;
                result.message = 'email unauthorized';
                result.data = { _id: obj._id };
                reject(result);
            }
            else {
                resolve(obj._id);
            }
        });
    });
});
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const done = yield loginCheck(data.email, data.password);
    yield user_db_1.User.findOneAndUpdate({ email: data.email }, { last_login: new Date() });
    return done;
});
exports.default = login;
//# sourceMappingURL=user_login.js.map