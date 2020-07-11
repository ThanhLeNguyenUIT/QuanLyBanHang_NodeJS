var mongoose = require('mongoose')
var billSchema = mongoose.Schema({
    name_account: {
        type: String,
        require: true
    },
    name_agency: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    total_money: {
        type: Number,
        require: true
    },
})
var bill = mongoose.model('bill', billSchema);
module.exports = bill;