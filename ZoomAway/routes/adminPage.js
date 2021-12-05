const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });

router.get('/createChallenge',(req,res)=>{
    res.render('admin/createChallenge')
})
router.get('/challengesDashboard',(req,res)=>{
    res.render('admin/challengesDashboard')
})
module.exports = router;