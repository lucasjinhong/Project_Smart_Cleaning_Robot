import { Schema as _Schema, model, Types } from 'mongoose';
const Schema = _Schema;

const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

interface IUser {
    _id: Types.ObjectId,
    email: string,
    username: string,
    password: string,
    email_authorization: Email_authorization,
    homes: Types.Array<Types.ObjectId|null>,
    last_login: Date|null
}

interface Email_authorization {
    authorization_code: number|null,
    authorized: boolean,
    expired_date: Date|null,
    authorized_date: Date
}

const userSchema = new Schema<IUser>({
    _id: Types.ObjectId,
    email: {
        type: String, 
        required: [true, 'email is required'],
        unique: true,
        validate: 
        {
            validator: (v: string) => re.test(v),
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
},{timestamps: true})

export const User = model<IUser>('User', userSchema);