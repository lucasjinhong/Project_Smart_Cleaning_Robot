import jwt from 'jsonwebtoken';
import {env} from '../config/development_config';

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

let verify = {};

const verification = async(token:string) => {
    const time = Math.floor(Date.now() / 1000);

    return new Promise((resolve, reject) => {
        if(!token){
            result.status = 403;
            result.message = 'missing token';
            reject(result);
            return;
        }

        if(token){
            jwt.verify(token, env.secret, (err:any, decoded:any) => {
                if(err){
                    verify = false;
                    resolve(verify);
                }
                else if(decoded.exp <= time) {
                    verify = false;
                    resolve(verify);
                }
                else {
                    verify = decoded.data;
                    resolve(verify);
                }
            })
        }
    });
}

const tokenCheck = async(token:any) => {
    return new Promise((resolve, reject) => {
        if(!token){
            result.status = 401;
            result.message = 'token unauthorized';
            reject(result);
            return;
        }
        else{
            resolve(token);
        }
    })
}

export const token_verification = async(token:string) => {
    const result = await tokenCheck(await verification(token));
    return result;
}