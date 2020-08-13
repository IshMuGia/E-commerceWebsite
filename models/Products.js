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
    category: {
        type: String,
        required: true

    },
    img1: {
        type: String,
        required: true

    },
    img2: {
        type: String,
        required: true

    },
    img3: {
        type: String,
        required: true

    },
    img4: {
        type: String,
        required: true

    },
    img5: {
        type: String,
        required: true

    },
    sub_brand: {
        type: String,
        required: true

    },
    s_des: {
        type: String,
        required: true

    },
    l_des: {
        type: String,
        required: true

    },
    mrp: {
        type: Number,
        required: true

    },
    v_item_code: {
        type: String,
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
    a_6: {
        type: String,
        required: true

    },
    colour: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    p_len: {
        type: Number,
        required: true

    },
    p_width: {
        type: Number,
        required: true

    },
    p_height: {
        type: Number,
        required: true

    },
    p_weight: {
        type: Number,
        required: true

    },
    len: {
        type: Number,
        required: true

    },
    width: {
        type: Number,
        required: true

    },
    height: {
        type: Number,
        required: true

    },
    weight: {
        type: Number,
        required: true

    },
    warranty: {
        type: Number,
        required: true

    },
    rating: {
        type: Number,
        required: true

    },
    
    review: {
        type: mongoose.Types.ObjectId,
        ref: "Review"
    },
    category: {
        type: String,
        required: true

    }
});

const Product = mongoose.model('Product', ProdSchema, 'vendor_listing');

module.exports = Product;