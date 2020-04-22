var mongoose = require('mongoose')
var categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_category: {
        type: Number,
        require: true
    },
    name_category: String
})

var category = mongoose.model('categories', categorySchema);

module.exports = category;