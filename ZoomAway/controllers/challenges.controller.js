const Challenges = require("../models/challenges.model")
const helper = require('../helper/helper')
const fs = require('fs')

const {
    body,
    validationResult
} = require('express-validator');

exports.getAll = async (req, res) => {
    try {
        const challenges = await Challenges.find({}).select('_id challengeName')
        res.send(challenges)
    } catch (err) {
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }
}

exports.getOne = async (req, res) => {
    try {
        const challenges = await Challenges.find({
            _id: req.params.id
        })
        res.send(challenges[0])
    } catch (err) {
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }
}

exports.createChallenge = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            res.status(422).json({
                errors: errors.array()
            });
            return;
        }
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
    try {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            res.status(422).json({
                errors: errors.array()
            });
            return;
        }
        fs.writeFileSync(__dirname + "/../public/MSP432 Files/commands.txt", req.body.command)
        res.status(200).send("Success")
    } catch (err) {
        console.log(err)
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }
}

exports.deleteChallenge = async (req, res) => {
    try {
        await Challenges.deleteOne({
            _id: req.params.id
        })
        res.status(200).send(helper.formatMessage(200, "Successfully Delete Challenge", "Success"))
    } catch (err) {
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }
}

exports.validateInput = (method) => {
    switch (method) {
        case 'createChallenge': {
            return [
                body('challengeName', 'Empty Challenge Name').notEmpty(),
                body('challengeName').escape().trim(),

                body('instruction', 'Empty Instruction Name').notEmpty(),
                body('instruction').escape().trim(),

                body('command', 'Empty Command').notEmpty(),
                body('command').escape().trim(),
                body('command').custom(value=>{
                    for (var i = 0; i < value.length; i++) {
                        if(value[i]!='F' && value[i]!='L' && value[i]!='R' ){
                            throw new Error('Command must be F or L or R');
                        }
                      }
                    return true;
                }),

                body('maze', 'Empty Maze Details').exists(),

                body('maze.firstRow',"First Row Do not exist").exists(),
                body('maze.firstRow',).custom(value=>{
                    if(value.length>5 || value.length<5){
                        throw new Error('First Row length must be 5 ');
                    }
                    return true;
                }),
                body('maze.firstRow.*').isInt({
                    min: 0,
                    max: 1
                }),

                body('maze.secondRow',"Second Row Do not exist").exists(),
                body('maze.secondRow',).custom(value=>{
                    if(value.length>5 || value.length<5){
                        throw new Error('Second Row length must be 5 ');
                    }
                    return true;
                }),
                body('maze.secondRow.*').isInt({
                    min: 0,
                    max: 1
                }),


                body('maze.thirdRow',"Third Row Do not exist").exists(),
                body('maze.thirdRow',).custom(value=>{
                    if(value.length>5 || value.length<5){
                        throw new Error('Third Row length must be 5 ');
                    }
                    return true;
                }),
                body('maze.thirdRow.*').isInt({
                    min: 0,
                    max: 1
                }),


                body('maze.fourthRow',"Fourth Row Do not exist").exists(),
                body('maze.fourthRow',).custom(value=>{
                    if(value.length>5 || value.length<5){
                        throw new Error('Fourth Row length must be 5 ');
                    }
                    return true;
                }),
                body('maze.fourthRow.*').isInt({
                    min: 0,
                    max: 1
                }),

                body('maze.fifthRow',"Fifth Row Do not exist").exists(),
                body('maze.fifthRow',).custom(value=>{
                    if(value.length>5 || value.length<5){
                        throw new Error('Fifth Row length must be 5 ');
                    }
                    return true;
                }),
                body('maze.fifthRow.*').isInt({
                    min: 0,
                    max: 1
                }),

                body('maze.startPoint.x', "Start Point X-Coordinate is Missing").exists(),
                body('maze.startPoint.x').isInt({
                    min: 1,
                    max: 5
                }),

                body('maze.startPoint.y', "Start Point Y-Coordinate is Missing").exists(),
                body('maze.startPoint.y').isInt({
                    min: 1,
                    max: 5
                }),

                body('maze.endPoint.x', "End Point X-Coordinate is Missing").exists(),
                body('maze.endPoint.x').isInt({
                    min: 1,
                    max: 5
                }),

                body('maze.endPoint.y', "End Point Y-Coordinate is Missing").exists(),
                body('maze.endPoint.y').isInt({
                    min: 1,
                    max: 5
                }),
            ]
        }
        case 'sendCommand': {
            return [
                body('command', 'Empty Command').notEmpty(),
                body('command').escape().trim(),
                body('command').custom(value=>{
                    for (var i = 0; i < value.length; i++) {
                        if(value[i]!='F' && value[i]!='L' && value[i]!='R' ){
                            throw new Error('Command must be F or L or R');
                        }
                      }
                    return true;
                }),
            ]
        }
    }
}