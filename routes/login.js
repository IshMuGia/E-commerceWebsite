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
    console.log(req.body);
    User.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            //console.log("User not exist");
            if (!user) return res.render('myaccount', { msg: "User not exist" });

            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err
                    //if both match than you can do anything
                if (data) {
                    console.log("Login success");
                    return res.redirect('/');
                } else {
                    console.log("Invalid password");
                    return res.render('myaccount', { msg: "Invalid password" });
                }
            });
            /*if (user.password != password) return res.status(401).send({ msg: 'Invalid email or password' });
            res.sendStatus(200);/*res.redirect('/index');*/
        })
        .catch(err => console.log(err));
});

module.exports = router;