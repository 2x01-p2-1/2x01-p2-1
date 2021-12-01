const Challenges = require("../models/challenges.model")
const helper = require('../helper/helper')

exports.challengeDashboardPage=async(req,res)=>{
    res.render('challenges');
}

exports.createChallengePage=async(req,res)=>{
    res.render('createChallenge');
}

