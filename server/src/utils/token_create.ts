import jwt from 'jsonwebtoken';
import {env} from '../config/development_config';

export const token = (data:string) => {

    const token = jwt.sign({
        algorithm: 'HS256',
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
    }, env.secret);

    return token;
}

export const emailToken = (data:string) => {

    const token = jwt.sign({
        algorithm: 'HS256',
        exp: Math.floor(Date.now() / 1000) + (60 * 10),
        data: data
    }, env.secret);

    return token;
}