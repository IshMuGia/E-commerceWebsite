const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
// Load User model
const User = require('../models/Users');
//const { forwardAuthenticated } = require('../config/auth');

//login
router.get("/login", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("login");
});
/*
//register page
router.get("/register", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("register");
});
*/
//Register handle
router.post("/register", (req, res) => {
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email
    var password = req.body.password
    var password2 = req.body.password2
    var phone = req.body.phone
    var dob = req.body.dob
    var pin = req.body.pin
    console.log(req.body);
    /*if (errors) {
        res.render('register', {
            errors,
            fname,
            lname,
            email,
            phone,
            dob,
            pin,
            password
        });
    } else {*/
    // validation passed
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                console.log("email exists");
                //user exists
                /*errors.push({ msg: 'Email is already registered!' });
                res.render('register', {
                    errors,
                    email,
                    password
                });*/
            } else {

                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: password,
                    phone: phone,
                    pincode: pin,
                    dob: dob
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
                                res.sendStatus(200); /*res.redirect('/index');*/
                            })
                            .catch(err => console.log(err));
                    });
                });
                //console.log(newUser);
                //res.send('hello');
            }
        });
    //res.send('pass');
});

//Login handle
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (errors) {
        res.render('register', {
            errors,
            email,
            password
        });
    } else {
        // validation passed
        User.findOne({ email: email })
            .then(user => {

                if (user) {
                    //user exists
                    res.render('register', {
                        errors,
                        email,
                        password
                    });
                }
            });
        res.send('pass');
    }
});

/*router.get("/", (req,res)=>{
// return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
res.render("index");
});*/

module.exports = router;