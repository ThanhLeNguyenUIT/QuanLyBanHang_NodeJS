var express = require('express');
var router = express.Router();
var agency = require("../model/agency");
var groupAgency = require("../model/groupAgency");
var areaAgency = require("../model/areaAgency");
const { render } = require('ejs');
const { get } = require('mongoose');

let getErrors;
router.get('/daily', function(req, res) {
    agency.find().then(function(agency) {
        res.render('daily', { agency: agency });
    })
});
router.post('/daily/them-daily', async(req, res) => {
    const checkDaily = await agency.findOne({ id_agency: req.body.id_agency })
    if (checkDaily) {
        req.checkBody('id_agency', 'Đã tồn tại đại lý').not().equals(checkDaily.id_agency);
    }
    getErrors = req.validationErrors();
    if (getErrors) {
        res.redirect('/daily');

    } else {
        const daily = new agency({
            id_agency: req.body.id_agency,
            name_agency: req.body.name_agency,
            phone_agency: req.body.phone_agency,
            area_agency: req.body.area_agency,
            group_agency: req.body.group_agency,
            address_agency: req.body.address_agency,
            date_agency: req.body.date_agency,
            debt_agency: req.body.date_agency
        })
        daily.save().then(() => {
            res.redirect('/daily');
        })
    }

})

module.exports = router;