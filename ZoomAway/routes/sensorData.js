const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });
router.use('/:sensorData', itemRouter);

const sensorData=require('../controllers/sensorData.controller')
router.get('/',sensorData.getAll);
module.exports = router;