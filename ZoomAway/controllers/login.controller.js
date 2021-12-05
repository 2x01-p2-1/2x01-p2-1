const passport = require('passport');
const authenticate=require('../controllers/authentication.controller')
const helper = require('../helper/helper')

const {
    body,
    validationResult
} = require('express-validator');

exports.login =async(req,res)=>{
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array()
        });
        return;
    }
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

exports.validateInput=(method)=>{
    switch(method){
        case 'login':{
            return [
                body('email', 'Empty Email').exists(),
                body('email', 'Invalid Email').isEmail(),
                body('email').escape().trim(),

                body('password', 'Empty Password').exists(),
                body('password').escape().trim(),
            ]
        }
    }
}