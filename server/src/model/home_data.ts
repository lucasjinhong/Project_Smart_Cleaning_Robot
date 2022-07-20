import {Home} from '../model/home_db';

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

const homeData = async(id:string) => {
    return new Promise ((resolve, reject) => {
        Home.findById({_id:id}, 'object updatedAt -_id', (err:any, obj:any) => {
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else{
                resolve(obj);
            }
        })
    })
}

export const getData = async(id:string) => {
    return await homeData(id);
}