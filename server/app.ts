import createError from 'http-errors';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import usersRouter from './routes/user';
import homesRouter from './routes/home';

import { NextFunction, Request, Response } from 'express';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/home', homesRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  // set locals, only providing error in development

  if(err.name === 'ValidationError'){
    const key = Object.keys(err.errors);
    err.status = 422;
    res.locals.error = {status: err.status, message: err.errors[key[0]].message};
  } 
  else if(err.code && err.code == 11000) {
    const key = Object.keys(err.keyValue);
    err.status = 409;
    res.locals.error = {status: err.status, message: err.keyValue[key[0]] + " existed"};
  }
  else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  }

  // render the error page
  res.status(err.status || 500);
  res.json(res.locals.error);
  //res.render('error');
});

const port = 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export default app;
