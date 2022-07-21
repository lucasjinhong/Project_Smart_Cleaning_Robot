"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../src/controllers/user_controller");
router.route('/register')
    .post(user_controller_1.toRegister);
router.route('/verified')
    .post(user_controller_1.toVerified);
router.route('/login')
    .post(user_controller_1.toLogin);
router.route('/update')
    .put(user_controller_1.toUpdate);
router.route('/resend/:id')
    .post(user_controller_1.toResend);
exports.default = router;
//# sourceMappingURL=user.js.map