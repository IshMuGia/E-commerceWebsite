const mongoose = require('mongoose');

const RevSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },

    email: {
        type: String,
        required: true

    },
    fname: {
        type: String,
        required: true

    },
    lname: {
        type: String,
        required: true

    },
    product: {
        type: String,
        required: true

    },
    comment: {
        type: String,
        required: true

    },
    rating: {
        type: Number,
        required: true

    }
});

const Review = mongoose.model('Review', RevSchema, 'product_review');

module.exports = Review;