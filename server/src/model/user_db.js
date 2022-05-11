const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

var userSchema = new Schema({
    _id: ObjectId,
    email: {
        type: String, 
        required: [true, 'email is required'],
        unique: true,
        validate: 
        {
            validator: v => re.test(v),
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
            type: ObjectId,
            ref: 'Home'
        }
    ],
    last_login: Date
},{timestamps: true})

var User = mongoose.model('User', userSchema);

module.exports = User;