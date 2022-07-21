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
const home_db_1 = require("../model/home_db");
const result = {
    status: 400,
    message: 'error',
    data: undefined
};
const homeData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        home_db_1.Home.findById({ _id: id }, 'object updatedAt -_id', (err, obj) => {
            if (err) {
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else {
                resolve(obj);
            }
        });
    });
});
const getData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield homeData(id);
});
exports.default = getData;
//# sourceMappingURL=home_data.js.map