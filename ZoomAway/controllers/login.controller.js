const passport = require('passport');
const authenticate=require('../controllers/authentication.controller')
const helper = require('../helper/helper')


exports.login =async(req,res)=>{
    passport.authenticate('local', (err, account) => {
        if (err) {
            if (err.message = "Invalid Credentials ") {
                res.status(401).send(helper.formatMessage(401, "Unauthorized", err.message))
            } else {
                res.status(500).send(helper.formatMessage(500, "Internal Server Error", err.message))
            }
        }
        if (account) {
            req.login(account, function (err) {
                res.status(200).send(helper.formatMessage(200, "Successfully Log In", "Success"))
            })
            
        }
    })(req, res);
}