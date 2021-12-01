mongoose = require('mongoose')
const challengeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    challengeName:{
        type:String
    },
    instructions:{
        type:String
    },
    mazeObj:{
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