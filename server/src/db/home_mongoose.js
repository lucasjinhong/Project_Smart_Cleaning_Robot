const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Project_Smart_Cleaning_Robot', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((error) => {
    console.log('something wrong', error);
})