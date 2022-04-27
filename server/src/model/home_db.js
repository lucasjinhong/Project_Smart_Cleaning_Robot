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
    data: [
        {
            object: Array,
            update_time: Date
        }
    ],
    create_by: {
        type: ObjectId,
        ref: 'User'
    },
    create_date: Date
})

var Home = mongoose.model('Home', homeSchema);

module.exports = Home;