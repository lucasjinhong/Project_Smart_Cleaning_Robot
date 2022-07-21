"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    email: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    },
    secret: process.env.SECRET,
    mongopw: process.env.MONGOPW
};
//# sourceMappingURL=development_config.js.map