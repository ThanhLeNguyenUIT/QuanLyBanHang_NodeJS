var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    id_product: {
        type: Number,
        require: true
    },
    name_product: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        require: true,
        type: String
    },
    ogn_price: {
        type: Number
    },
    type_product: String,
    exit: Number
});


module.exports = mongoose.model('products', productSchema);