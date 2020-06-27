const mongoose = require('mongoose');

const ProdSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },

    brand: {
        type: String,
        required: true

    },
    model_no: {
        type: String,
        required: true

    },
    img1: {
        type: String,
        required: true

    },
    s_des: {
        type: String,
        required: true

    },
    mrp: {
        type: Number,
        required: true

    },
    a_1: {
        type: String,
        required: true


    },
    a_2: {
        type: String,
        required: true


    },
    a_3: {
        type: String,
        required: true

    },
    a_4: {
        type: String,
        required: true

    },
    a_5: {
        type: String,
        required: true

    },
    colour: {
        type: String,
        required: true
    },
    review: {
        type: mongoose.Types.ObjectId,
        ref: "Review"
    }
});

const Product = mongoose.model('Product', ProdSchema, 'vendor_listing');

module.exports = Product;