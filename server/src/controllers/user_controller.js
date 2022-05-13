const mongoose = require('mongoose');
const User = require('../model/user_db');

const async_catch = require('../utils/async_catch');
const email_send = require('../utils/email_send');
const password_encryption = require('../utils/password_encryption');
const token_create = require('../utils/token_create');
const token_verification = require('../utils/token_verification');
const id_check = require('../utils/id_check');

const login = require('../model/user_login');
const emailAuthorize = require('../model/user_emailVerified');
const emailSearch = require('../model/user_emailSearch');
const { off } = require('../model/user_db');


exports.toRegister = async_catch(async(req, res, next) =>{

  var password = await password_encryption(req.body.password);
  var random = Math.floor((Math.random() * 1000000) + 100000);

  var data = new User({
    _id: mongoose.Types.ObjectId(),
    email: req.body.email,
    username: req.body.username,
    password: password,
    email_authorization:{
      authorization_code: random,
      authorized: false,
      expired_date: new Date(Date.now() + 10 * 60 * 1000)
    },
    register_date: new Date(),
  });

  await data.save();
  await res.setHeader('token', token_create.emailToken(data._id));
  await res.status(201).json({message:'email sent and data create', status:201, data:{_id:data.id}});

  email_send(data.email, random);
});

exports.toLogin = async_catch(async(req, res, next) => {

  var password = await password_encryption(req.body.password);

  var data = new User({
    email: req.body.email,
    password: password
  })

  var search = await login(data);
  var home = await User.findById(search.id, "homes -_id").populate("homes", "name updatedAt");

  await res.setHeader('token', token_create.token(search._id));
  await res.status(200).send({message:'login success', status:200, data:home});
})

exports.toUpdate = async_catch(async(req, res, next) => {

  var token = req.headers['token'];
  var password = await password_encryption(req.body.password);

  var data = new User({
    username:req.body.username,
    password: password,
    update_date: new Date()
  });

  var auth = await token_verification(token);
  await id_check(auth);
  await User.findByIdAndUpdate(auth, data);
  await res.status(200).send({message:'update success', status:200})
})

exports.toVerified = async_catch(async(req, res, next) => {

  var code = req.body.code;
  var token = req.headers['token'];
  
  var data = new User({
    email_authorization: {
      authorized: true,
      authorized_date: new Date(),
      expired_date: {expires: off}
    },
  })
  
  var auth = await token_verification(token);
  await id_check(auth);
  await emailAuthorize(auth, code, data);
  await res.status(200).send({message:'email verified', status:200});
})

exports.toResend = async_catch(async(req, res, next) => {
  var random = Math.floor((Math.random() * 1000000) + 1);
  var id = req.params.id;

  var data = new User({
    email_authorization:{
      authorization_code: random,
      authorized: false
    },
  });

  email = await emailSearch(id, data);
  await res.setHeader('token', token_create.emailToken(id));
  await res.status(200).send({message:'email sent', status:200});

  email_send(email.email, random);
})