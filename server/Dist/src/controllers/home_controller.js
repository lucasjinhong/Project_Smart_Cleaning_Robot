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
exports.toUpdateData = exports.toData = exports.toQuit = exports.toJoin = exports.toDelete = exports.toCreate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("../db/mongoose");
const home_db_1 = require("../model/home_db");
const user_db_1 = require("../model/user_db");
const async_catch_1 = require("../utils/async_catch");
const token_verification_1 = require("../utils/token_verification");
const id_check_1 = require("../utils/id_check");
const home_delete_1 = __importDefault(require("../model/home_delete"));
const home_join_1 = __importDefault(require("../model/home_join"));
const home_quit_1 = __importDefault(require("../model/home_quit"));
const home_data_1 = __importDefault(require("../model/home_data"));
exports.toCreate = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['token'];
    const auth = yield (0, token_verification_1.token_verification)(token);
    const data = new home_db_1.Home({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name,
        users: [auth],
        create_by: auth,
        create_date: new Date()
    });
    yield data.save();
    yield user_db_1.User.findByIdAndUpdate(auth, { $push: { homes: data._id } });
    yield res.status(201).send({ message: 'Create success', status: 201, data: { id: data._id } });
}));
exports.toDelete = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['token'];
    const auth = yield (0, token_verification_1.token_verification)(token);
    const id = req.params.home_id;
    yield (0, id_check_1.id_check)(id);
    yield (0, id_check_1.id_check)(auth);
    yield (0, home_delete_1.default)(auth, id);
    yield res.status(201).send({ message: 'Delete success', status: 201 });
}));
exports.toJoin = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['token'];
    const auth = yield (0, token_verification_1.token_verification)(token);
    const id = req.params.home_id;
    yield (0, id_check_1.id_check)(id);
    yield (0, id_check_1.id_check)(auth);
    const name = yield (0, home_join_1.default)(auth, id);
    yield res.status(201).send({ message: 'Join success', status: 201, data: name });
}));
exports.toQuit = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['token'];
    const auth = yield (0, token_verification_1.token_verification)(token);
    const id = req.params.home_id;
    yield (0, id_check_1.id_check)(id);
    yield (0, id_check_1.id_check)(auth);
    yield (0, home_quit_1.default)(auth, id);
    yield res.status(201).send({ message: 'quit success', status: 201 });
}));
exports.toData = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['token'];
    yield (0, token_verification_1.token_verification)(token);
    const id = req.params.home_id;
    yield (0, id_check_1.id_check)(id);
    const data = yield (0, home_data_1.default)(id);
    yield res.status(200).json({ message: 'data get success', status: 200, data: data });
}));
exports.toUpdateData = (0, async_catch_1.async_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.home_id;
    const data = req.body.object;
    yield (0, id_check_1.id_check)(id);
    yield home_db_1.Home.findByIdAndUpdate(id, { $push: { object: data } });
    yield res.status(200).json({ message: 'data push success', status: 200 });
}));
//# sourceMappingURL=home_controller.js.map