var express = require('express');
var router = express.Router();

var home_controller = require('../src/controllers/home_controller')

router.route('/create')
  .post(home_controller.toCreate);
  
router.route('/delete/:home_id')
  .delete(home_controller.toDelete);

router.route('/join/:home_id')
  .patch(home_controller.toJoin);

router.route('/quit/:home_id')
  .patch(home_controller.toQuit);

router.route('/data/:home_id')
  .get(home_controller.toData);

module.exports = router;