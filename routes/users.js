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
    var phone = req.body.phone
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
                res.render('myaccount', {
                    email,
                    password
                });
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
                                res.redirect('/');
                            })
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
    var email = req.body.email
    var password = req.body.password
    console.log(req.body);
    User.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            if (!user) return res.render('myaccount', { msg: "User not exist" });
            
            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err
                    //if both match than you can do anything
                if (data) {
                    return res.render('/', { msg: "Login success" });
                } else {
                    return res.render('myaccount', { msg: "Invalid password" });
                }
            });
            /*if (user.password != password) return res.status(401).send({ msg: 'Invalid email or password' });
            res.sendStatus(200);/*res.redirect('/index');*/
        })
        .catch(err => console.log(err));
});

/*} else {
    // validation passed
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                console.log("email exists");

                User.findOne({ password: req.body.password })
                    .then(user => {
                        if (user) {
                        console.log("Correct password");
                        res.sendStatus(200); /*res.redirect('/index');*/
//user exists
/*res.render('register', {
                             errors,
                            email,
                            password
                        });*/
/*
                }   })}
            });
        res.send('pass');
    }
});*/

/*router.get("/", (req,res)=>{
// return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
res.render("index");
});*/

module.exports = router;