const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });

router.get('/',(req,res)=>{
    res.render('homepage')
})

router.get('/attemptChallenge/:id',(req,res)=>{
    req.logOut()
    res.render('attemptChallenge',{
        challengeId:req.params.id
    })
})
module.exports = router;