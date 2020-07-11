const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,

    },
    email: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        require: true,
    },
    category_account: {
        type: String,
        require: true
    },
    sexual: {
        type: String,
        require: true
    },
    address_account: {
        type: String,
        require: true
    },
    date: {
        type: String
    },
    phone_account: {
        type: String,
    },
    salary: {
        type: Number,
        default: 0
    }
});
var user = mongoose.model('users', userSchema);
module.exports = user;