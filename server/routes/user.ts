import express from 'express';
const router = express.Router();

import {toRegister, toVerified, toLogin, toResend, toUpdate} from '../src/controllers/user_controller';

router.route('/register')
  .post(toRegister);

router.route('/verified')
  .post (toVerified);

router.route('/login')
  .post(toLogin);

router.route('/update')
  .put(toUpdate);

router.route('/resend/:id')
  .post(toResend);

export default router; 