const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
// Load User model
const User = require('../models/Users');

//Login handle
router.post("/", (req, res) => {
    var email = req.body.email
    var password = req.body.password
    req.session.email = email
    req.session.password = password
    console.log(req.body);
    User.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            //console.log("User not exist");
            const msg = "User not exist";
            const msg1 = "";
            var rec = new Object();
            rec.msg1 = msg1;
            rec.msg = msg;

            if (!user) return res.render('myaccount', { rec: rec });;
            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err
                    //if both match than you can do anything
                if (data) {
                    var date = new Date();
                    var timestamp = date.getTime();
                    req.session.time=timestamp;
                    console.log("Login success");
                    return res.redirect('/');
                } else {
                    const msg = "Invalid password";
                    const msg1 = "";
                    var rec = new Object();
                    rec.msg1 = msg1;
                    rec.msg = msg;

                    return res.render('myaccount', { rec: rec });
                }
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;