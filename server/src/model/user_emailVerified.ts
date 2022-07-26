import {User} from './user_db';

interface Result {
    status: number;
    message: string;
    data: any;
}

interface Email_authorization {
    email_authorization:{
        authorization_code: number|null,
        authorized: boolean,
        expired_date: Date|null,
        authorized_date: Date
    }
}

const result:Result = {
    status: 400,
    message: 'error',
    data: undefined
};

const checkCode = async(id:string, code:number) => {
    return new Promise<undefined>((resolve, reject) => {
        if(!code){
            result.status = 422;
            result.message = 'pls input code';
            reject(result);
            return;
        }

        User.findById({_id:id}, 'email_authorization', (err:string, obj:Email_authorization) => {
            console.log(obj)
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else if (obj.email_authorization.authorization_code !== code){
                result.status = 422;
                result.message = 'wrong verification code';
                reject(result);
                return;
            }
            else{
                resolve(undefined);
            }
        })
    })
}


const emailAuthorize = async(id:string, code:number, data:Email_authorization) => {
    await checkCode(id, code);
    await User.findByIdAndUpdate(id, data);
    return;
}

export default emailAuthorize;