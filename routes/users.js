const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
// Load User model
const User = require('../models/Users');
//const { forwardAuthenticated } = require('../config/auth');

//Register handle
router.post("/", (req, res) => {
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email
    var password = req.body.password
    var phone = req.body.phone
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                const msg1 = "User already exists!";
                const msg = "";
                var rec = new Object();
                rec.msg1 = msg1;
                rec.msg = msg;
                res.render('myaccount', { rec: rec });

                console.log("email exists");
            } else {

                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: password,
                    phone: phone
                });
                console.log(newUser)
                    //hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //Set password to hash
                        newUser.password = hash;
                        //Save user
                        newUser
                            .save()
                            .then(user => {
                                req.session.email = email
                                req.session.password = password
                                res.redirect('/');
                            })
                    });
                });
                //console.log(newUser);
                //res.send('hello');
            }
        });

});
module.exports = router;