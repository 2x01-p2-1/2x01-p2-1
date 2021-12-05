const Account = require("../models/account.model");
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

/**********************
 * Passport Local Strategy to Login
 *********************/
passport.use(

    new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const account = await Account.findOne({
                    email: email,
                })
                if (!account) {
                    var error = new Error('Invalid Credentials');
                    return done(error, false);
                }
                if (bcrypt.compareSync(password, account.passwordHash)) {
                    return done(null, account)
                } else {
                    var error = new Error('Invalid Credentials')
                    return done(error, false)
                }
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

/**********************
 * Passport Function to Serialize User
 *********************/
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

/**********************
 * Passport Function to Deserialize User
 *********************/
passport.deserializeUser(async function (_id, done) {
    let user = await Account.findById(_id);
    done(null, user);
});