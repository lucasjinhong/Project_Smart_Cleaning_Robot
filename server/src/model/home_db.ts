import { Schema as _Schema, model, Types } from 'mongoose';
const Schema = _Schema;
const ObjectId = Types.ObjectId;

const homeSchema = new Schema({
    _id: ObjectId,
    name: {
        type: String, 
        required: [true, 'name is required']
    },
    users:[
        {
            type: ObjectId,
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
        type: ObjectId,
        ref: 'User',
        unique: false
    },
},{timestamps: true})

export const Home = model('Home', homeSchema);