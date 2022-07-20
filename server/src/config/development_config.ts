import dotenv from 'dotenv'
dotenv.config()

interface Env {
    email: {
        email: any;
        password: any;
    };
    secret: any;
    mongopw: any;
}

export const env:Env = {
    email: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    },
    secret: process.env.SECRET,
    mongopw: process.env.MONGOPW
}