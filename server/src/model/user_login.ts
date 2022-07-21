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

const loginCheck = async(email:string, password:string) => {
    return new Promise((resolve, reject) => {
        User.findOne({email:email, password:password}, (err:any, obj:any) => {
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
                resolve(obj);
            }
        })
    })
};

const login = async(data:any) => {
    const done = await loginCheck(data.email, data.password);
    await User.findOneAndUpdate({email:data.email}, {last_login:new Date()});

    return done;
}

export default login;
