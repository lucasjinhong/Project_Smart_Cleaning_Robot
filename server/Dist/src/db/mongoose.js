"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//import {env} from '../config/development_config';
//const url = 'mongodb+srv://lucasjh:'+ env.mongopw +'@smartrobot.ubcvr.mongodb.net/Project_Smart_Cleaning_Robot?retryWrites=true&w=majority';
const url = 'mongodb://localhost:27017/Project_Smart_Cleaning_Robot';
//const url = 'mongodb://localhost:27017/Project_Smart_Cleaning_Robot_Test'; //testing
mongoose_1.default.connect(url, {}).catch((error) => {
    console.log('something wrong', error);
});
//# sourceMappingURL=mongoose.js.map