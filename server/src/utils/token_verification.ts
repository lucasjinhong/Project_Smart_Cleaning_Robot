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

let verify = '';

const verification = async(token:string) => {
    const time = Math.floor(Date.now() / 1000);

    const p = new Promise<string>((resolve, reject) => {
        if(!token){
            result.status = 403;
            result.message = 'missing token';
            reject(result);
            return;
        }

        if(token){
            jwt.verify(token, env.secret, (err:Error, decoded:{exp:number; data:string}) => {
                if(err){
                    verify = '';
                    resolve(verify);
                }
                else if(decoded.exp <= time) {
                    verify = '';
                    resolve(verify);
                }
                else {
                    verify = decoded.data;
                    resolve(verify);
                }
            })
        }
    });

    return p;
}

const tokenCheck = async(token:string) => {
    const p = new Promise<string>((resolve, reject) => {
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

    return p;
}

export const token_verification = async(token:string) => {
    const t = token.substr(7,token.length);
    const result = await tokenCheck(await verification(t));
    return result;
}