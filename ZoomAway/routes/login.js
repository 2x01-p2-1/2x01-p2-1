const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });
router.use('/:login', itemRouter);
const loginController=require('../controllers/login.controller')

router.get('/',loginController.render)
router.post('/',loginController.login)

module.exports = router;