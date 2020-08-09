const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Prod = require('../models/Products');
const Rev = require("../models/Review");
const Wishlist = require('../models/Wishlist');
const Act = require('../models/ActivityLog');

router.get("/", (req, res) => {
    //console.log('hello')
    //console.log(req.session.email)
    if (req.session.email) {
        //console.log(req.query.id);
        res.redirect('/logged/?uid=' + req.query.uid);
    } else {
        res.redirect("/myaccount");
    }

});
//res.redirect('/logged/?uid=' + req.query.uid);
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
                                        // console.log(docs)
                                        res.render('index', {
                                            results: docs
                                        })
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
    } else {
        res.redirect("/myaccount")
    }

});

router.get("/myaccount", (req, res) => {
    if (req.session.email) {
        res.redirect('/logged');

    } else {
        const msg1 = "";
        const msg = "";
        var rec = new Object();
        rec.msg1 = msg1;
        rec.msg = msg;
        res.render('myaccount', {
            rec: rec
        });
    }
});

router.get('/logout', (req, res) => {
    var currentDate = new Date();
    //console.log(currentDate);
    var myquery = {
        email: req.session.email
    };
    var newvalues = {
        $set: {
            logout: currentDate
        }
    };
    console.log(newvalues);
    Act.updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        //console.log(result);
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    });
});

router.get("/dproduct", (req, res) => {
    const id = req.query.id;
    console.log(id)
    Prod.find({
            model_no: id
        })
        .exec()
        .then(docs1 => {

            Rev.find({
                    product: id
                })
                .exec()
                .then(docs2 => {

                    console.log(docs1)

                    const docs = docs1.concat(docs2)
                    //console.log(docs)
                    res.render('product', {
                        results: docs
                    });
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
    Cart.find({
            model_no: email
        }, 'email model_no')
        .exec()
        .then(docs1 => {
            Prod.find({
                    product: id
                })
                .exec()
                .then(docs2 => {
                    const docs = docs1.concat(docs2)
                    RT - AC86U
                    console.log(docs)
                    res.status(200).json({
                        results: docs
                    });
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

router.get("/addtowishlist", (req, res) => {
    var email = req.query.email;
    var model_no = req.query.model_no;
    Wishlist.findOne({
        email: email,
        model_no: model_no
        })
        .then(exist => {
            //if productexist than return status 400
            //console.log("User not exist");
            if (!exist) {
                const msg = "Product Saved!";
                req.session.msg = msg;
                const newwish = new Wishlist({
                    _id: new mongoose.Types.ObjectId(),
                    model_no: model_no,
                    email: email,
                });

                console.log(newwish)
                newwish
                    .save()
                    .then(Wishlist => {
                        res.redirect('/dproduct/?id=' + req.query.model_no);
                        console.log("Added to Wishlist");
                        console.log(newwish);
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
            if (exist) {
                const msg = "Product already Exist!";
                //res.send(msg);
                req.session.msg = msg;
                res.sendStatus(200)

            }
        })
        .catch(err => console.log(err));


});


router.get("/removefromwishlist", (req, res) => {
    var email = req.query.email;
    var model_no = req.query.model_no;
    Wishlist.findOneAndRemove({
            email: email,
            model_no: model_no
        }).then(results => {
            res.redirect('/wishlist/?email=' + req.query.email);
            console.log("Removed from Wishlist");
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
//const g_docs = [];
router.get("/wishlist", (req, res) => {
    var email = req.query.email;
    Wishlist.find({
            email: email
        }, 'model_no -_id')
        .exec()
        .then(docs1 => {
            Prod.find()
                .where('model_no')
                .in(docs1.map(i => i.model_no))
                .exec()
                .then(records => {
                    res.render("wishlist", {
                        results: records
                    });

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

// Brand Shop
router.get("/brandshop", (req, res) => {
    Prod.find({
            brand: req.query.brand
        })
        .then(results => {
            if (results) {
                console.log(results);
                res.render("shop", {
                    results: results
                });
            } else {
                console.log("Empty")
            }
        })
        .catch(err => console.log(err));
});

// SubBrand Shop
router.get("/subbrandshop", (req, res) => {
    Prod.find({
            sub_brand: req.query.sub_brand
        })
        .then(results => {
            if (results) {
                console.log(results);
                res.render("shop", {
                    results: results
                });
            } else {
                console.log("Empty")
            }
        })
        .catch(err => console.log(err));
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
router.get("/wishlist", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("wishlist");
});

router.get("/checkout", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("checkout");
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
// router.post("/search", (req, res) => {
//     var word = req.body.word;
//     Prod.find({ $or: [{ brand: word }, { sub_brand: word }, { model_no: word }] })
//         .exec()
//         .then(results => {
//             console.log(results)
//             res.render("shop", { results: results });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

module.exports = router;