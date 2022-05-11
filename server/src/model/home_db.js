const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var homeSchema = new Schema({
    _id: ObjectId,
    name: {
        type: String, 
        required: [true, 'name is required']
    },
    users:[
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    object: [
        {
            type: String
        }
    ],
    create_by: {
        type: ObjectId,
        ref: 'User'
    },
},{timestamps: true})

var Home = mongoose.model('Home', homeSchema);

module.exports = Home;