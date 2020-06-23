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
    model_no1: {
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

    }
});

const Product = mongoose.model('Product', ProdSchema, 'vendor_listing');

module.exports = Product;