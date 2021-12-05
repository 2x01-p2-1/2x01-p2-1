mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
    },
    passwordHash:{
        type:String
    }
}, {
    collection: 'Account'
});
module.exports = mongoose.model('Account', accountSchema)