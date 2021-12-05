const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ strict: true });

router.get('/createChallenge',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('admin/createChallenge')
    }else{
        res.render('admin/login')
    }
})

router.get('/challengesDashboard',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('admin/challengesDashboard')
    }else{
        res.render('admin/login')
    }
    
})

router.get('/login',(req,res)=>{
    res.render("admin/login")
})

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/')
})
module.exports = router;