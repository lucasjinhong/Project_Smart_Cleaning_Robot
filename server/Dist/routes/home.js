"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const home_controller_1 = __importDefault(require("../src/controllers/home_controller"));
router.route('/create')
    .post(home_controller_1.default.toCreate);
router.route('/delete/:home_id')
    .delete(home_controller_1.default.toDelete);
router.route('/join/:home_id')
    .patch(home_controller_1.default.toJoin);
router.route('/quit/:home_id')
    .patch(home_controller_1.default.toQuit);
router.route('/data/:home_id')
    .get(home_controller_1.default.toData);
router.route('/data/:home_id')
    .patch(home_controller_1.default.toUpdateData);
exports.default = router;
//# sourceMappingURL=home.js.map