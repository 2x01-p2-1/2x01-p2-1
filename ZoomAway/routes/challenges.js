const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });
router.use('/:challenges', itemRouter);

const Challenges=require('../controllers/challenges.controller')
//Get All Challenge
router.get('/',Challenges.getAll)

//Get One Challenge

//Send Command
router.post('/sendCommand',Challenges.sendCommand)

//Create One Challenge
router.post('/',Challenges.createChallenge)

//Delete Challenge
router.delete('/:id',Challenges.deleteChallenge)
module.exports = router;