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

const checkId = async(id:string, data:any) =>{
    return new Promise ((resolve, reject) => {
        User.find({_id:id, homes: {$in: [data]}}, (err:any, obj:any) => {
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(obj.length){
                result.status = 400;
                result.message = 'home already joined';
                return reject(result);
            }
            else {
                resolve(undefined);
            }          
        })
    })
}

const checkHome = async(data:any) => {
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
            else{
                resolve(undefined);
            }
        })
    })
}


const joinHome = async(id:any, data:any) => {
    await checkId(id, data);
    await checkHome(data);
    await Home.findByIdAndUpdate(data, { $push: { users: id } });
    await User.findByIdAndUpdate(id, { $push: { homes: data } });
    const name = await Home.findById(data, 'name -_id');
    return name;
}

export default joinHome;