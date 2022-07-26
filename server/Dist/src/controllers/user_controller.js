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
exports.toResend = exports.toVerified = exports.toUpdate = exports.toLogin = exports.toRegister = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("../db/mongoose");
const user_db_1 = require("../model/user_db");
const async_catch_1 = require("../utils/async_catch");
const email_send_1 = require("../utils/email_send");
const password_encryption_1 = require("../utils/password_encryption");
const token_create_1 = require("../utils/token_create");
const token_create_2 = require("../utils/token_create");
const token_verification_1 = require("../utils/token_verification");
const id_check_1 = require("../utils/id_check");
const user_login_1 = __importDefault(require("../model/user_login"));
const user_emailVerified_1 = __importDefault(require("../model/user_emailVerified"));
const user_emailSearch_1 = __importDefault(require("../model/user_emailSearch"));
const process_1 = require("process");
exports.toRegister = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, password_encryption_1.password_encryption)(req.body.password);
    const random = Math.floor((Math.random() * 1000000) + 100000);
    //var random = 123456; //testing
    const data = new user_db_1.User({
        _id: new mongoose_1.default.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: password,
        email_authorization: {
            authorization_code: random,
            authorized: false,
            expired_date: new Date(Date.now() + 10 * 60 * 1000)
        },
        register_date: new Date(),
    });
    yield data.save();
    res.setHeader('token', (0, token_create_2.email_token)(String(data._id)));
    res.status(201).json({ message: 'email sent and data create', status: 201, data: { _id: data.id } });
    (0, email_send_1.email_send)(data.email, random);
}));
exports.toLogin = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, password_encryption_1.password_encryption)(req.body.password);
    const data = new user_db_1.User({
        email: req.body.email,
        password: password
    });
    const search = yield (0, user_login_1.default)(data);
    const home = yield user_db_1.User.findById(search, "homes -_id").populate("homes", "name updatedAt");
    res.setHeader('authorization', (0, token_create_1.token_create)(search));
    res.status(200).send({ message: 'login success', status: 200, data: home });
}));
exports.toUpdate = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    const password = yield (0, password_encryption_1.password_encryption)(req.body.password);
    const data = new user_db_1.User({
        username: req.body.username,
        password: password,
        update_date: new Date()
    });
    const auth = yield (0, token_verification_1.token_verification)(token);
    yield (0, id_check_1.id_check)(auth);
    yield user_db_1.User.findByIdAndUpdate(auth, data);
    res.status(200).send({ message: 'update success', status: 200 });
}));
exports.toVerified = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    const token = req.headers['authorization'];
    const data = new user_db_1.User({
        email_authorization: {
            authorized: true,
            authorized_date: new Date(),
            expired_date: { expires: process_1.off }
        },
    });
    const auth = yield (0, token_verification_1.token_verification)(token);
    yield (0, id_check_1.id_check)(auth);
    yield (0, user_emailVerified_1.default)(auth, code, data);
    res.status(200).send({ message: 'email verified', status: 200 });
}));
exports.toResend = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const random = Math.floor((Math.random() * 1000000) + 1);
    const id = req.params.id;
    //var random = 1234567; //testing
    const data = new user_db_1.User({
        email_authorization: {
            authorization_code: random,
            authorized: false
        },
    });
    const email = yield (0, user_emailSearch_1.default)(id, data);
    res.setHeader('token', (0, token_create_2.email_token)(id));
    res.status(200).send({ message: 'email sent', status: 200 });
    (0, email_send_1.email_send)(email.email, random);
}));
//# sourceMappingURL=user_controller.js.map