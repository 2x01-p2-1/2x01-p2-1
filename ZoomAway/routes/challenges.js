const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });
router.use('/:challenges', itemRouter);

const Challenges=require('../controllers/challenges.controller')
const Authenticate=require('../controllers/authentication.controller')

//Get All Challenge
router.get('/',Challenges.getAll)

//Get One Challenge
router.get('/:id',Challenges.getOne)

//Send Command
router.post('/sendCommand',Challenges.validateInput('sendCommand'),Challenges.sendCommand)

//Create One Challenge
router.post('/',Authenticate.checkAuthenticated(),Challenges.validateInput('createChallenge'),Challenges.createChallenge)

//Delete Challenge
router.delete('/:id',Authenticate.checkAuthenticated(),Challenges.deleteChallenge)

module.exports = router;