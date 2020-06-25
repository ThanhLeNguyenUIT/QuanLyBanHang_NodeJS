var mongoose = require('mongoose')
var groupAgencySchema = mongoose.Schema({
    name_groupAgency: String
})

var groupAgency = mongoose.model('groupAgencies', groupAgencySchema);

module.exports = groupAgency;