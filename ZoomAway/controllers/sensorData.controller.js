const sensorData = require("../models/sensorsData.model")
const helper = require('../helper/helper')

exports.getAll=async(req,res)=>{
    try{
        const result=await sensorData.find({})
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(helper.formatMessage(500, err, "Internal Server Error"))
    }
}

