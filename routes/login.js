const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
// Load User model
const User = require('../models/Users');
const Act = require('../models/ActivityLog');

//Login handle
router.post("/", (req, res) => {
    var email = req.body.email
    var password = req.body.password

    console.log(req.body);
    User.findOne({
            email
        })
        .then(user => {

            //if user not exist than return status 400
            //console.log("User not exist");
            const msg = "User not exist";
            const msg1 = "";
            var rec = new Object();
            rec.msg1 = msg1;
            rec.msg = msg;

            if (!user) return res.render('myaccount', {
                rec: rec
            });;
            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err
                //if both match than you can do anything
                if (data) {
                    req.session.email = email
                    req.session.password = password
                    req.session.uid = user._id;
                    const m = "Save Product";
                    req.session.msg = m
                    var currentDate = new Date();
                    req.session.logdate = currentDate;
                    console.log(req.session.logdate);
                    console.log("Login success");
                    const newLog = new Act({
                        email: req.session.email,
                        login: currentDate
                    });
                    newLog
                        .save()
                        .then(r => {
                            console.log(user._id)
                            return res.redirect('/?uid=' + user._id);
                        })
                        //return res.redirect('/?uid=' + r._id);

                        .catch(err => console.log(err));

                } else {
                    const msg = "Invalid password";
                    const msg1 = "";
                    var rec = new Object();
                    rec.msg1 = msg1;
                    rec.msg = msg;

                    return res.render('myaccount', {
                        rec: rec
                    });
                }
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;


//console.log(currentDate);
// var date = currentDate.getDate();
// var month = currentDate.getMonth(); //Be careful! January is 0 not 1
// var year = currentDate.getFullYear();
// var dateString = date + "-" +(month + 1) + "-" + year;