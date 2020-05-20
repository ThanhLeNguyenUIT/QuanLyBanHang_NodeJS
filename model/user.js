var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_user: {
        type: Number,
        require: true
    },
    name_login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    Name_user: {
        type: String,
        require: true
    },
    identify: {
        type: Number,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    position: {
        type: Number,
        require: true
    }
})

var user = mongoose.model('user', userSchema);
module.exports = user;