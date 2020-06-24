const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Prod = require('../models/Products');

router.get("/", (req, res) => {
    Prod.find({}, 'brand s_des img1 mrp -_id')
        .then(results => {
            if (results) {
                res.render('index', { results: results });
            } else { console.log("Empty") }
        })
        .catch(err => console.log(err));
});

router.get("/search", (req, res) => {
    var q = req.query.q;
    //full text 
    // Product.find({
    //     $text: {
    //         $search: q
    //     }
    // }, {
    //     _id: 0,
    //     _v: 0
    // }, function(err, data) {
    //     res.json(data);
    // });

    //PARTIAL TEXT SEARCH

    Prod.find({
        model_no: {
            $regex: new RegExp(q)
        }
    }, {
        _id: 0,
        _v: 0
    }, function(err, data) {
        console.log("Partial Search Begins");
        console.log(data);
        res.json(data);
    }).limit(10);
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

router.get("/myaccount", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("myaccount");
});

router.get("/shop", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("shop");
});

router.get("/product", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("product");
});

router.get("/cart", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("cart");
});

router.get("/checkout", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("checkout");
});

router.get("/wishlist", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("wishlist");
});

router.get("/", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("index");
});

module.exports = router;