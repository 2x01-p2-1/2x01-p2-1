mongoose = require('mongoose')
const challengeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    challengeName:{
        type:String
    },
    instruction:{
        type:String
    },
    command:{
        type:String
    },
    maze:{
        firstRow:[Number],
        secondRow:[Number],
        thirdRow:[Number],
        fourthRow:[Number],
        fifthRow:[Number],
        startPoint:{
            x:{
                type:Number
            },
            y:{
                type:Number
            }
        },
        endPoint:{
            x:{
                type:Number
            },
            y:{
                type:Number
            }
        }
    }
}, {
    collection: 'challenges'
});
module.exports = mongoose.model('Challenges', challengeSchema)