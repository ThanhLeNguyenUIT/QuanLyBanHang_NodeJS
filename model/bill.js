var mongoose = require('mongoose')
var billSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_bill: {
        type: Number,
        require: true
    },
    name: {
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