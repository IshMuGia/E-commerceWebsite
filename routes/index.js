const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Prod = require('../models/Products');

router.get("/", (req, res) => {
    Prod.find({}, 'brand s_des mrp -_id')
        .then(results => {
            if (results) {
                res.send(results);
                //user exists
                /*errors.push({ msg: 'Email is already registered!' });
                res.render('register', {
                    errors,
                    email,
                    password
                });*/
            } else { console.log("Empty") }
        })
        .catch(err => console.log(err));
});

/*kennel.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }); */
// return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });

//res.render("index");


router.get("/login", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("login");
});

router.get("/", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("index");
});

router.get("/", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("index");
});

module.exports = router;