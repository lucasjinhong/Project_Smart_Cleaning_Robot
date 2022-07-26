interface Result {
    status: number;
    message: string;
    data: any;
}

const result:Result = {
    status: 400,
    message: 'id error',
    data: undefined
}

export const id_check = async(id:string) => {
    return new Promise<undefined> ((resolve, reject) => {
        const re = /^[0-9a-fA-F]{24}$/;
        if(!re.test(String(id))){
            result.status = 400;
            result.message = 'id error';
            reject(result);
        }
        else{
            resolve(undefined);
        }
    })
}