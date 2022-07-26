"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema({
    _id: mongoose_1.Types.ObjectId,
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: {
            validator: (v) => re.test(v),
            message: 'wrong email format'
        }
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    email_authorization: {
        authorization_code: Number,
        authorized: Boolean,
        expired_date: {
            type: Date,
            expires: 0
        },
        authorized_date: Date
    },
    homes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Home'
        }
    ],
    last_login: Date
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user_db.js.map