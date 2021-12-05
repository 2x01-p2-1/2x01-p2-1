const Challenges = require("../models/challenges.model")
const helper = require('../helper/helper')
const fs = require('fs')


exports.getAll=async(req,res)=>{
    try{
        const challenges=await Challenges.find({}).select('_id challengeName')
        res.send(challenges)
    }catch(err){
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }
}

exports.createChallenge = async (req, res) => {
    try {
        const newChallenge = new Challenges({
            _id: new mongoose.Types.ObjectId(),
            challengeName: req.body.challengeName,
            instruction: req.body.instruction,
            command: req.body.command,
            maze: req.body.maze
        });
        await newChallenge.save()
        res.status(200).send(helper.formatMessage(200, "Successfully Created Challenge", "Success"))
    } catch (err) {
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }



}

exports.sendCommand = async (req, res) => {
    console.log(req.body.commands)
    try {
        fs.writeFileSync(__dirname + "/../public/MSP432 Files/commands.txt", req.body.commands)
        res.status(200).send("Success")
    } catch (err) {
        console.log(err)
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }
}

exports.deleteChallenge=async(req,res)=>{
    try{
       await Challenges.deleteOne({_id:req.params.id})
       res.status(200).send(helper.formatMessage(200, "Successfully Delete Challenge", "Success"))
    }catch(err){
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }
}