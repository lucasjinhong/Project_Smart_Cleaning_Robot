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

export const checkId = async(id:string) => {
    return new Promise ((resolve, reject) => {
        const re = /^[0-9a-fA-F]{24}$/;
        if(!re.test(id)){
            result.status = 400;
            result.message = 'id error';
            reject(result);
        }
        else{
            resolve(undefined);
        }
    })
}