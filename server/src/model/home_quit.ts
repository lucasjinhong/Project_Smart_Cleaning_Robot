import {User} from '../model/user_db';
import {Home} from '../model/home_db';

interface Result {
    status: number;
    message: any;
    data: any;
}

const result: Result = {
    status: 400,
    message: 'error',
    data: undefined
};

const checkId = async(id:string, data:any) => {
    return new Promise ((resolve, reject) => {
        User.find({_id:id, homes: {$in: [data]}}, function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(!obj.length){
                result.status = 400;
                result.message = 'not in this home';
                reject(result);
                return;
            }
            else {
                resolve(undefined);
            }
        })

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
            else{
                resolve(undefined);
            }
        })
    })
}

const checkHome = async(data:any) => {
    return new Promise ((resolve, reject) => {
        Home.findById({_id:data}, (err:any, obj:any) => {
            console.log(obj.users)
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(obj.users.length){
                resolve(undefined);
            }
            else{
                Home.findByIdAndDelete({_id: data}, (err:any) =>{
                    if(err){
                        result.status = 500;
                        result.message = err;
                        reject(result);
                        return;
                    }
                    else{
                        resolve(undefined);
                    }
                })
            }
        })       
    })
}


const quitHome = async(id:any, data:any) => {
    await checkId(id, data);
    await Home.findByIdAndUpdate(data, { $pull: { users: id } });
    await checkHome(data);
    await User.findByIdAndUpdate(id, { $pull: { homes: data } });
}

export default quitHome;