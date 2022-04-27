const mongoose = require('mongoose');
const env = require('../config/development_config');
const url = 'mongodb+srv://lucasjh:'+ env.mongopw +'@smartrobot.ubcvr.mongodb.net/Project_Smart_Cleaning_Robot?retryWrites=true&w=majority';

mongoose.connect(url, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((error) => {
    console.log('something wrong', error);
})