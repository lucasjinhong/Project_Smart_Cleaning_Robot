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
exports.password_encryption = void 0;
const crypto_1 = __importDefault(require("crypto"));
const result = {
    status: 400,
    message: 'error',
    data: undefined
};
const passwordCheck = (password) => {
    return new Promise((resolve, reject) => {
        if (password.length < 6 || password.length > 12) {
            result.status = 409;
            result.message = "password is required in length (6~12)";
            reject(result);
        }
        else {
            resolve(undefined);
        }
    });
};
const password_encryption = (password) => __awaiter(void 0, void 0, void 0, function* () {
    yield passwordCheck(password);
    const hashPassword = crypto_1.default.createHash('sha256');
    hashPassword.update(password);
    const newPassword = hashPassword.digest('hex');
    return newPassword;
});
exports.password_encryption = password_encryption;
//# sourceMappingURL=password_encryption.js.map