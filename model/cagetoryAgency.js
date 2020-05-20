var mongoose = require('mongoose')
var categoryAgencySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_categoryAgency: {
        type: Number,
        require: true
    },
    name_categoryAgency: String
})

var categoryAgency = mongoose.model('categoryAgency', categorySchema);

module.exports = categoryAgency;