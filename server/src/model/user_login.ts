import {Types} from 'mongoose';
import {User} from '../model/user_db';

interface Result {
    status: number;
    message: string;
    data: any;
}

const result: Result = {
    status: 400,
    message: 'error',
    data: undefined
};

interface Obj {
    email_authorization: {
        authorized: boolean,
        authorized_date: Date
    },
    _id: string,
    email: string,
    username: string,
    password: string,
    homes: string[],
    createdAt: Date,
    updatedAt: Date,
    __v: number,
    last_login: Date
}

interface Data {
    email: string,
    password: string
}

const loginCheck = async(email:string, password:string) => {
    return new Promise<string>((resolve, reject) => {
        User.findOne({email:email, password:password}, (err:string, obj:Obj) => {
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }

            if(!obj){
                result.status = 401;
                result.message = 'login failed';
                reject(result);
            }
            else if(!obj.email_authorization.authorized){
                result.status = 403;
                result.message = 'email unauthorized';
                result.data = {_id:obj._id};
                reject(result);
            }
            else{
                resolve(obj._id);
            }
        })
    })
};

const login = async(data:Data) => {
    const done = await loginCheck(data.email, data.password);
    await User.findOneAndUpdate({email:data.email}, {last_login:new Date()});
    return done;
}

export default login;
