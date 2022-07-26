import crypto from 'crypto';

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

const passwordCheck = (password:string) => {
    return new Promise<string|undefined> ((resolve, reject) => {
        if(password.length < 6 || password.length > 12){
            result.status = 409;
            result.message = "password is required in length (6~12)";
            reject(result);
        }
        else { 
            resolve(undefined);
        }
    })
}

export const password_encryption = async(password:string) => {
    
    await passwordCheck(password);

    const hashPassword = crypto.createHash('sha256');

    hashPassword.update(password);

    const newPassword = hashPassword.digest('hex');
    return newPassword;
};