mongoose = require('mongoose')
moment=require('moment')

const sensorDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    success:{
        type:Boolean,
    },
    wheelEncoder:{
        type:Number
    },
    timeTaken:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:moment(Date.now()).format("DD-MM-YYYY HH:mm:ss")
    }
}, {
    collection: 'sensorData'
});
module.exports = mongoose.model('SensorData', sensorDataSchema)