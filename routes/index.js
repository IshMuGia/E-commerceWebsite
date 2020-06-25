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

// Brand Shop
router.get("/brandshop", (req, res) => {
    Prod.find({ brand: req.body.brand }, 'sub_brand s_des img1 mrp a_1 a_2 a_3 -_id' )
        .then(results => {
            if (results) {
                console.log(results);
                res.render("shop", { results: results });
            } else { console.log("Empty") }
        })
        .catch(err => console.log(err));
});

// SubBrand Shop
router.post("/subbrandshop", (req, res) => {
    Prod.find({ sub_brand: req.body.sub_brand }, 'brand s_des img1 mrp a_1 a_2 a_3 -_id')
        .then(results => {
            if (results) {
                console.log(results);
                res.render("shop", { results: results });
            } else { console.log("Empty") }
        })
        .catch(err => console.log(err));
});

// Brand by Attribute Shop
/*router.post("/brandbyattributeshop", (req, res, next) => {
    var fltrbrand = req.body.brand;
    var fltrsub_brand = req.body.sub_brand;
    var fltrcolour = req.body.colour;
    if(fltrbrand !='' && fltrsub_brand !='' && fltrcolour != ''){
        var filterParameter = { $and:[{ brand:fltrbrand},
    {$and:[{sub_brand:fltrbrand},{colour:fltrcolour}]}   
    ]

        }
    }else if (fltrbrand !='' && fltrsub_brand =='' && fltrcolour != ''){
        var filterParameter = { $and:[{ brand:fltrbrand},{colour:fltrcolour}]
            }   

    }else if (fltrbrand =='' && fltrsub_brand !='' && fltrcolour != ''){
        var filterParameter = { $and:[{ sub_brand:fltrsub_brand},{colour:fltrcolour}]
            }   
    }else if (fltrbrand !='' && fltrsub_brand !='' && fltrcolour == ''){
        var filterParameter = { $and:[{ brand:fltrbrand},{sub_brand:fltrsub_brand}]
            } 
    }else{
        var filterParameter={}
    }
    var ProdFltr = Prod.find(filterParameter);
    ProdFltr.exec(function(err,data){
        if(err) throw err;
        res.render("shop", { results: results });
        });
});*/

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
    const msg = "Enter the details";

    res.render('myaccount', { msg: msg });
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