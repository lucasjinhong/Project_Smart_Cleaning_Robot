import express from 'express';
const router = express.Router();

import {toCreate, toDelete, toJoin, toQuit, toData, toUpdateData} from '../src/controllers/home_controller';

router.route('/create')
  .post(toCreate);
  
router.route('/delete/:home_id')
  .delete(toDelete);

router.route('/join/:home_id')
  .patch(toJoin);

router.route('/quit/:home_id')
  .patch(toQuit);

router.route('/data/:home_id')
  .get(toData);

router.route('/data/:home_id')
  .patch(toUpdateData);

export default router;