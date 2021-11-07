const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });
router.use('/:sensorData', itemRouter);

const Challenges=require('../controllers/sensorData.controller')

module.exports = router;