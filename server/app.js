const createError = require('http-errors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/user');
const homesRouter = require('./routes/home');

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
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
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

module.exports = app;
