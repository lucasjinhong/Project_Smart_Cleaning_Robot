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
exports.id_check = void 0;
const result = {
    status: 400,
    message: 'id error',
    data: undefined
};
const id_check = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const re = /^[0-9a-fA-F]{24}$/;
        if (!re.test(id)) {
            result.status = 400;
            result.message = 'id error';
            reject(result);
        }
        else {
            resolve(undefined);
        }
    });
});
exports.id_check = id_check;
//# sourceMappingURL=id_check.js.map