const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });
router.use('/:challenges', itemRouter);

const Challenges=require('../controllers/challenges.controller')
//Get All Challenge Page
router.get('/',Challenges.challengeDashboardPage)
router.get('/create',Challenges.createChallengePage)
router.get('/attemptChallenge',Challenges.attemptChallengePage)
router.post('/sendCommand',Challenges.sendCommand)
module.exports = router;