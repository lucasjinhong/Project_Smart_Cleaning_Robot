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
const checkId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        user_db_1.User.findById({ _id: id }, '_id', (err, obj) => {
            if (err) {
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if (!obj) {
                result.status = 400;
                result.message = 'user not exist';
                reject(result);
                return;
            }
            else {
                resolve(undefined);
            }
        });
    });
});
const checkAuthorize = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        user_db_1.User.findById({ _id: id }, '-_id email_authorization.authorized', (err, obj) => {
            if (err) {
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if (obj.email_authorization.authorized == true) {
                result.status = 400;
                result.message = 'user alr authorized';
                reject(result);
                return;
            }
            else {
                resolve(undefined);
            }
        });
    });
});
const search = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkId(id);
    yield checkAuthorize(id);
    yield user_db_1.User.findByIdAndUpdate(id, data);
    return yield user_db_1.User.findById(id, '-_id email');
});
exports.default = search;
//# sourceMappingURL=user_emailSearch.js.map