const mongoose = require('mongoose');
const User = require('../model/user_db');

const async_catch = require('../utils/async_catch');
const email_send = require('../utils/email_send');
const password_encryption = require('../utils/password_encryption');
const token_create = require('../utils/token_create');
const verify = require('../utils/token_verification');

const register = require('../model/user_register');
const login = require('../model/user_login');
const update = require('../model/user_updateData');
const emailAuthorize = require('../model/user_email_authorize');
const emailSearch = require('../model/user_emailSearch');


exports.toRegister = async_catch(async(req, res, next) =>{

  var password = password_encryption(req.body.password);
  var random = Math.floor((Math.random() * 1000000) + 1);

  var data = new User({
    _id: mongoose.Types.ObjectId(),
    email: req.body.email,
    username: req.body.username,
    password: password,
    email_authorization:{
      authorization_code: random,
      authorized: false
    },
    register_date: new Date()
  });

  await register(data);
  await res.setHeader('token', token_create.emailToken(data._id));
  await res.status(201).json({message:'email sent', status:201});

  email_send(data.email, random);
});

exports.toLogin = async_catch(async(req, res, next) => {

  var password = password_encryption(req.body.password);

  var data = new User({
    email: req.body.email,
    password: password
  })

  var search = await login(data);
  await res.setHeader('token', token_create.token(search._id));
  await res.status(200).send('<h1>login successful</h1> <h2>200</h2>');
})

exports.toUpdate = async_catch(async(req, res, next) => {

  var token = req.headers['token'];
  var password = password_encryption(req.body.password);

  var data = new User({
    username:req.body.username,
    password: password,
    update_date: new Date()
  });

  var auth = await verify(token);
  await update(auth, data);
  await res.status(200).send('<h1>update success</h1> <h2>200</h2>')
})

exports.toVerified = async_catch(async(req, res, next) => {

  var code = req.body.code;
  var token = req.headers['token'];
  
  var data = new User({
    email_authorization: {
      authorized: true,
      authorized_date: new Date()
    },
  })
  
  var auth = await verify(token);
  await emailAuthorize(auth, code, data);
  await res.status(200).send('<h1>Email authorize</h1> <h2>200</h2>');
})

exports.toResend = async_catch(async(req, res, next) => {
  var random = Math.floor((Math.random() * 1000000) + 1);
  var id = req.params.id;

  var data = new User({
    email_authorization:{
      authorization_code: random,
      authorized: false
    }
  });

  email = await emailSearch(id, data);
  await res.setHeader('token', token_create.emailToken(id));
  await res.status(201).send('<h1>email send</h1> <h2>200</h2>');

  email_send(email, random);
})