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
exports.email_send = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const development_config_1 = require("../config/development_config");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: development_config_1.env.email.email,
        pass: development_config_1.env.email.password
    },
    tls: {
        rejectUnauthorized: false
    }
});
const email_send = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: development_config_1.env.email.email,
        to: email,
        subject: 'Authentication code of Nodejs',
        text: 'the authentication code is ' + code
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log("Error " + err);
        }
        else {
            console.log("Email sent successfully");
        }
    });
});
exports.email_send = email_send;
//# sourceMappingURL=email_send.js.map