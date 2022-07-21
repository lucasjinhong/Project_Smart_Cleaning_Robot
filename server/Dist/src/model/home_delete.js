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
const home_db_1 = require("../model/home_db");
const result = {
    status: 400,
    message: 'error',
    data: undefined
};
const checkId = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        home_db_1.Home.findById({ _id: data }, (err, obj) => {
            if (err) {
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if (!obj) {
                result.status = 400;
                result.message = 'home unavailable';
                reject(result);
                return;
            }
            else if (obj.create_by.equals(id)) {
                resolve(undefined);
            }
            else {
                result.status = 403;
                result.message = 'unauthorized';
                reject(result);
                return;
            }
        });
    });
});
const deleteHome = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkId(id, data);
    yield home_db_1.Home.findByIdAndDelete(data);
    yield user_db_1.User.findByIdAndUpdate(id, { $pull: { homes: data } });
});
exports.default = deleteHome;
//# sourceMappingURL=home_delete.js.map