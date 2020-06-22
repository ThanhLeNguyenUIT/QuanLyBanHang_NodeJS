var mongoose = require('mongoose')
var areaAgencySchema = mongoose.Schema({
    name_areaAgency: String
})

var areaAgency = mongoose.model('areaAgency', areaAgencySchema);

module.exports = areaAgency;