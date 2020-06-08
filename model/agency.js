var mongoose = require('mongoose')
var agencySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_agency: {
        type: Number,
        require: true
    },
    name_agency: {
        type: String,
        require: true
    },
    phone_agency: {
        type: Number,
        require: true
    },
    area_agency: {
        type: String,
        require: true
    },
    type_agency: {
        type: Number,
        require: true
    },
    address_agency: {
        type: String,
        require: true
    },
    date_agency: {
        type: Date,
        default: Date.now()
    },
    debt_agency: {
        type: Number,
        default: 0
    }
})
var agency = mongoose.model('agency', agencySchema);
module.exports = agency;