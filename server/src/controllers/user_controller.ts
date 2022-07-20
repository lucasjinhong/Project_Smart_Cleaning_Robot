import mongoose from 'mongoose';
import User from '../model/user_db';

import async_catch from '../utils/async_catch';
import email_send from '../utils/email_send';
import password_encryption from '../utils/password_encryption';
import token_create from '../utils/token_create';
import token_verification from '../utils/token_verification';
import id_check from '../utils/id_check';

import login from '../model/user_login';
import emailAuthorize from '../model/user_emailVerified';
import emailSearch from '../model/user_emailSearch';
import { off } from '../model/user_db';


export const toRegister = async_catch(async(req:any, res:any) =>{

  const password = await password_encryption(req.body.password);
  const random = Math.floor((Math.random() * 1000000) + 100000);

  //var random = 123456; //testing

  const data = new User({
    _id: new mongoose.Types.ObjectId(),
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

export const toLogin = async_catch(async(req:any, res:any) => {

  const password = await password_encryption(req.body.password);

  const data = new User({
    email: req.body.email,
    password: password
  })

  const search = await login(data);
  const home = await User.findById(search.id, "homes -_id").populate("homes", "name updatedAt");

  await res.setHeader('token', token_create.token(search._id));
  await res.status(200).send({message:'login success', status:200, data:home});
})

export const toUpdate = async_catch(async(req:any, res:any) => {

  const token = req.headers['token'];
  const password = await password_encryption(req.body.password);

  const data = new User({
    username:req.body.username,
    password: password,
    update_date: new Date()
  });

  const auth = await token_verification(token);
  await id_check(auth);
  await User.findByIdAndUpdate(auth, data);
  await res.status(200).send({message:'update success', status:200})
})

export const toVerified = async_catch(async(req:any, res:any) => {

  const code = req.body.code;
  const token = req.headers['token'];
  
  const data = new User({
    email_authorization: {
      authorized: true,
      authorized_date: new Date(),
      expired_date: {expires: off}
    },
  })
  
  const auth = await token_verification(token);
  await id_check(auth);
  await emailAuthorize(auth, code, data);
  await res.status(200).send({message:'email verified', status:200});
})

export const toResend = async_catch(async(req:any, res:any) => {
  const random = Math.floor((Math.random() * 1000000) + 1);
  const id = req.params.id;

  //var random = 1234567; //testing

  const data = new User({
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