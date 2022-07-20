import {User} from '../model/user_db';
import {Home} from '../model/home_db';

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

const checkId = async(id:string, data:any) => {
    return new Promise ((resolve, reject) => {
        Home.findById({_id:data}, (err:any, obj:any) => {
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }

            if(!obj){
                result.status = 400;
                result.message = 'home unavailable';
                reject(result);
                return;
            }
            else if(obj.create_by.equals(id)){
                resolve(undefined);
            }
            else{
                result.status = 403;
                result.message = 'unauthorized';
                reject(result);
                return;
            }
        })
    })
}


export const deleteHome = async(id:string, data:any) => {
    await checkId(id, data);
    await Home.findByIdAndDelete(data);
    await User.findByIdAndUpdate(id, { $pull: { homes: data } })
}