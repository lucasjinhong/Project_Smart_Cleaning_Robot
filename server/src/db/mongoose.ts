import mongoose from 'mongoose';

//import {env} from '../config/development_config';
//const url = 'mongodb+srv://lucasjh:'+ env.mongopw +'@smartrobot.ubcvr.mongodb.net/Project_Smart_Cleaning_Robot?retryWrites=true&w=majority';
const url = 'mongodb://localhost:27017/Project_Smart_Cleaning_Robot';

//const url = 'mongodb://localhost:27017/Project_Smart_Cleaning_Robot_Test'; //testing

mongoose.connect(url, {}).catch((error) => {
    console.log('something wrong', error);
})