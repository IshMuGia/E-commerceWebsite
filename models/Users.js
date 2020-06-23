const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
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
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true

    },
});

const User = mongoose.model('User', UserSchema, 'User_info');

module.exports = User;