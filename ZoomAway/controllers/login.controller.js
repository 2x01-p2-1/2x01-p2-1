const passport = require('passport');
const authenticate=require('../controllers/authentication.controller')
const helper = require('../helper/helper')


exports.render = async (req, res) => {
    res.render('Admin/login')
}

exports.login =async(req,res)=>{
    passport.authenticate('local', (err, account) => {
        if (err) {
            if (err.message = "Invalid Credentials ") {
                res.status(401).send(helper.formatError(401, "Unauthorized", err.message))
            } else {
                res.status(500).send(helper.formatError(500, "Internal Server Error", err.message))
            }
        }
        if (account) {
            req.login(account, function (err) {
                res.status(200).send("Success")
            })
            
        }
    })(req, res);
}
