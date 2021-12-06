const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });
router.use('/:login', itemRouter);
const Login=require('../controllers/login.controller')

router.post('/',Login.validateInput('login'),Login.login)

module.exports = router;