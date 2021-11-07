const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });
router.use('/:challenges', itemRouter);

const Challenges=require('../controllers/challenges.controller')

module.exports = router;