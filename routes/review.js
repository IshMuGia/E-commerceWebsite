const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rev = require("../models/Review");
const Prod = require('../models/Products');
const User = require('../models/Users');
// var Integer = require('integer');


router.post("/", (req, res) => {
    var rating = req.body.rating;
    var comment = req.body.comment;
    var model_no = req.body.id;
    var email = req.body.email;
    User.find({
        email: email
    }, 'fname lname -_id').then(results => {
        //console.log(results)
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
        //console.log(newRev)
        newRev
            .save()
            .then(rev => {
                Rev.aggregate([{
                            $match: {
                                product: model_no
                            }
                        },
                        {
                            $group: {
                                _id: "$product",
                                avgRating: {
                                    $avg: "$rating"
                                }
                            }
                        }
                    ])
                    .then(avgR => {
                        // console.log();
                        r = Math.round(avgR[0].avgRating);
                        Prod.findOneAndUpdate({
                                model_no: model_no
                            }, {
                                rating: r
                            })
                            .then(doc => {
                                console.log("hpgyabro");
                                //console.log("hjhd")
                                res.redirect('/dproduct/?id=' + model_no);
                                // console.log("Review Submitted");
                                // console.log(rev);
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

            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });
});

module.exports = router;
////let doc = await 