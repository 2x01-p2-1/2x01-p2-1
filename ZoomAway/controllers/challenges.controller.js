const Challenges = require("../models/challenges.model")
const helper = require('../helper/helper')
const fs = require('fs')

exports.challengeDashboardPage=async(req,res)=>{
    res.render('challenges');
}

exports.createChallengePage=async(req,res)=>{
    res.render('createChallenge');
}
exports.attemptChallengePage=async(req,res)=>{
    res.render('attemptChallenge');
}
exports.sendCommand=async(req,res)=>{
    console.log(req.body.commands)
    try{
        fs.writeFileSync(__dirname + "/../public/MSP432 Files/commands.txt", req.body.commands)
        res.status(200).send("Success")
    }catch(err){
        console.log(err)
        res.status(500).send(helper.formatError(500, err, "Internal Server Error"))
    }
    
    res.send
}


