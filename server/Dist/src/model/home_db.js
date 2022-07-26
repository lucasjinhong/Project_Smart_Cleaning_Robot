"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const homeSchema = new Schema({
    _id: mongoose_1.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'name is required']
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: false
        }
    ],
    object: [
        {
            type: String
        }
    ],
    create_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: false
    },
}, { timestamps: true });
exports.Home = (0, mongoose_1.model)('Home', homeSchema);
//# sourceMappingURL=home_db.js.map