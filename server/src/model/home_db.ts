import { Schema as _Schema, model, Types } from 'mongoose';
const Schema = _Schema;

interface IHome {
    _id: Types.ObjectId,
    name: string
    users: Types.Array<Types.ObjectId|null>,
    object: Types.Array<string|null>,
    create_by: Types.ObjectId,
}

const homeSchema = new Schema<IHome>({
    _id: Types.ObjectId,
    name: {
        type: String, 
        required: [true, 'name is required']
    },
    users:[
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
},{timestamps: true})

export const Home = model<IHome>('Home', homeSchema);