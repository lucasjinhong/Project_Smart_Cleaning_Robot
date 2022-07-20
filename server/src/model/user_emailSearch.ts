import {User} from '../model/user_db';

interface Result {
    status: number;
    message: string;
    data: any;
}

const result:Result = {
    status: 400,
    message: 'error',
    data: undefined
};

const checkId = async(id:string) => {
    return new Promise ((resolve, reject) => {
        User.findById({_id:id}, '_id', (err:any, obj:any) => {
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(!obj){
                result.status = 400;
                result.message = 'user not exist';
                reject(result);
                return;
            }
            else {
                resolve(undefined);
            }
        })
    })
}

const checkAuthorize = async(id:string) => {
    return new Promise ((resolve, reject) => {
        User.findById({_id:id}, '-_id email_authorization.authorized', (err:any, obj:any) => {
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(obj.email_authorization.authorized == true){
                result.status = 400;
                result.message = 'user alr authorized';
                reject(result);
                return;
            }
            else {
                resolve(undefined);
            }
        })
    })
}


export const search = async (id: string, data:any) => {
    await checkId(id);
    await checkAuthorize(id);
    await User.findByIdAndUpdate(id, data);
    return await User.findById(id, '-_id email');
}