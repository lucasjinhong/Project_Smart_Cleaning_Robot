import { NextFunction, Request, Response } from 'express';
import 'express-async-errors'

export const async_catch = (fn:any) => {
    return (req:Request, res:Response, next:NextFunction) => {
        fn (req, res, next).catch((err:Error) => next(err));
    }
}