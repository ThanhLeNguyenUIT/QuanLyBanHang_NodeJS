var mongoose = require('mongoose')
var billInfoSchema = mongoose.Schema({
    id_bill: {
        type: Number,
        require: true
    },
    id_product: {
        type: Number,
        require: true
    },
    name_product: {
        type: String,
        require: true
    },
    type_product: String,
    price: {
        type: Number,
        require: true
    },
    total_price: {
        type: Number,
        require: true
    },
})
var billInfo = mongoose.model('billInfo', billInfoSchema);
module.exports = billInfo;