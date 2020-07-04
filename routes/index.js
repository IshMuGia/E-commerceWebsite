const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Prod = require('../models/Products');
const Rev = require("../models/Review");
const Review = require('../models/Review');
const User = require('../models/Users');
const Wishlist = require('../models/Wishlist');


router.get("/", (req, res) => {
    console.log('hello')
    console.log(req.session.email)
    if (req.session.email) {
        res.redirect('/logged');
    } else {
        res.redirect("/myaccount");
    }

});


// router.get("/", (req, res) => {
//     Prod.find({}, 'brand s_des img1 mrp model_no -_id')
//         .then(results => {
//             if (results) {
//                 res.render('index', { results: results });
//             } else { console.log("Empty") }
//         })
//         .catch(err => console.log(err));
// });
// router.get("/list", (req, res) => {
//     Prod.find().distinct('brand')
//         .then(docs1 => {
//             Prod.find().distinct('sub_brand')
//             .then(docs2 => {
//                 const docs = docs1.concat(docs2)
//                 console.log(docs)
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     error: err
//                 });
//             });

//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         });
//     });
// });
// Search
router.post("/search", (req, res) => {
    var word = req.body.word;
    Prod.find({ $or: [{ brand: word }, { sub_brand: word }, { model_no: word }] })
        .exec()
        .then(results => {
            console.log(results)
            res.render("shop", { results: results });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post("/review", (req, res) => {
    var rating = req.body.rating;
    var comment = req.body.comment;
    var model_no = req.body.id;
    var email = "giannadrego1503@gmail.com";
    User.find({ email: email }, 'fname lname -_id').then(results => {
        console.log(results) {
            fname = results[0].fname
            lname = results[0].lname
            const newRev = new Rev({
                _id: new mongoose.Types.ObjectId(),
                rating: rating,
                comment: comment,
                product: model_no,
                email: email,
                fname: fname,
                lname: lname,
            });
            console.log(newRev)
            newRev
                .save()
                .then(Rev => {
                    res.redirect('/dproduct/?id=' + model_no);
                    console.log("Review Submitted");
                    console.log(newRev);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
});


router.get("/dproduct", (req, res) => {
    const id = req.query.id;
    console.log(id)
    Prod.find({ model_no: id })
        .exec()
        .then(docs1 => {

            Rev.find({ product: id })
                .exec()
                .then(docs2 => {
                    console.log(docs2.length)

                    const docs = docs1.concat(docs2)
                    console.log(docs)
                    res.render('product', { results: docs });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/addtocart", (req, res) => {
    const email = req.query.email;
    console.log(email)
    Cart.find({ model_no: email }, 'email model_no')
        .exec()
        .then(docs1 => {
            Prod.find({ product: id })
                .exec()
                .then(docs2 => {
                    const docs = docs1.concat(docs2)
                    RT - AC86U
                    console.log(docs)
                    res.status(200).json({ results: docs });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post("/addtowishlist", (req, res) => {
    var email = req.body.email;
    var model_no = req.body.model_no;
        { 
        const newwish = new Wishlist({
        _id: new mongoose.Types.ObjectId(),
        model_no: model_no, 
        email: email,
    }); 
        console.log(newwish)
        newwish
        .save()
            .then(Wishlist => {
            res.redirect('/dproduct/?model_no=product' +req.body.model_no);
            console.log("Added to Wishlist");
            console.log(newwish);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
      }  });    

      
      router.post("/removefromwishlist", (req, res) => {
        var email = req.body.email;
        var model_no = req.body.model_no;
        Wishlist.findOneAndRemove({ email: email, model_no: model_no }) .then(results  =>{
                res.redirect('/wishlist');
                console.log("Removed from Wishlist");
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            });
            
router.post("/displaywishlist", (req, res) => {
    var email = req.body.email;
    Wishlist.find({email: email}, 'model_no -_id')
        .exec()
        .then(docs1 => {
            var i=0;
            const docs = {};
            while(docs1[i].model_no)
            {
            model_no = docs1[i].model_no;
            Prod.find({model_no : model_no})
            .exec()
            .then(docs2 => {
                docs[i]= docs2;
            console.log(docs)
            console.log(i)
                        })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
                i=i+1
            }            
        res.status(200).json({results: docs});
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });

router.get("/searchmushira", (req, res) => {
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
router.get("/brandshop", (req, res) => { <<
    << << < HEAD
    Prod.find({ brand: req.query.brand }, 'sub_brand s_des img1 mrp a_1 a_2 a_3 a_4 a_5 -_id') ===
        === =
        Prod.find({ brand: req.query.brand }, 'sub_brand s_des img1 mrp a_1 a_2 a_3 a_4 a_5 model_no -_id') >>>
        >>> > 3 bf84e9d10cd5bc8e370fb15a7384fe2d39f084e
        .then(results => {
            if (results) {
                console.log(results);
                res.render("shop", { results: results });
            } else { console.log("Empty") }
        })
        .catch(err => console.log(err));
});

// SubBrand Shop
router.get("/subbrandshop", (req, res) => {
    Prod.find({ sub_brand: req.query.sub_brand }, 'brand s_des img1 mrp a_1 a_2 a_3 a_4 a_5 model_no -_id')
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

// router.get("/", (req, res) => {
//     console.log('hello')
//     console.log(req.session.email)
//     if (req.session.email) {
//         res.redirect('/logged');
//     } else {
//         res.redirect("/myaccount");
//     }
//     // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
// });

router.get("/logged", (req, res) => {
    if (req.session.email) {
        Prod.find({}, 'brand s_des img1 mrp model_no -_id')
            .exec()
            .then(docs1 => {
                Prod.find().distinct('brand')
                    .then(docs2 => {
                        Prod.find().distinct('sub_brand')
                            .then(docs3 => {
                                Prod.find().distinct('model_no')
                                    .then(docs4 => {
                                        const docs = docs2.concat(docs3, docs4, docs1)
                                        console.log(docs)
                                        res.render('index', { results: docs })
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            error: err
                                        });
                                    });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            });
    }

});

router.get("/myaccount", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    const msg = "";
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

router.get("/checkout", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("checkout");
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

// router.get("/", (req, res) => {
//     // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
//     res.render("index");
// });

module.exports = router;