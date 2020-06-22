var mongoose = require('mongoose')
var groupAgencySchema = mongoose.Schema({
    name_groupAgency: String
})

var groupAgency = mongoose.model('groupAgency', groupAgencySchema);

module.exports = groupAgency;