var express = require('express');
var router = express.Router();
var agency = require("../model/agency");
var groupAgency = require("../model/groupAgency");
var areaAgency = require("../model/areaAgency");
const { render } = require('ejs');
const { get } = require('mongoose');
const { find } = require('../model/agency');


router.post('/daily/search', function(req, res) {
    agency.find({ 'id_agency': req.body.searchAgencyByID }).then(function(agencyFilter) {
        groupAgency.find().sort({ name_groupAgency: 1 }).then(function(groupAgency) {
            areaAgency.find().sort({ name_areaAgency: 1 }).then(function(areaAgency) {
                res.render('daily', { agency: agencyFilter, errors: getErrors, message: req.flash('message'), groupA: groupAgency, areaA: areaAgency });
            })
        })
    })
})
router.post('/daily/boloc', async(req, res) => {
    agency.find({ 'group_agency': req.body.group_agency, 'area_agency': req.body.area_agency }).then(function(agencyFilter) {

        groupAgency.find().sort({ name_groupAgency: 1 }).then(function(groupAgency) {
            areaAgency.find().sort({ name_areaAgency: 1 }).then(function(areaAgency) {
                res.render('daily', { agency: agencyFilter, errors: getErrors, message: req.flash('message'), groupA: groupAgency, areaA: areaAgency });
            })
        })
    })
})



let getErrors = '';
router.get('/daily', function(req, res) {
    agency.find().sort({ id_agency: 1 }).then(function(agency) {
        groupAgency.find().sort({ name_groupAgency: 1 }).then(function(groupAgency) {
            areaAgency.find().sort({ name_areaAgency: 1 }).then(function(areaAgency) {
                res.render('daily', { agency: agency, errors: getErrors, message: req.flash('message'), groupA: groupAgency, areaA: areaAgency });
            })
        })

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
            debt_agency: 0
        })
        daily.save().then(() => {
            req.flash('message', "Thêm sản phẩm thành công ");
            res.redirect('/daily');
        })
    }

})

router.get('/daily/xoa-daily/:id', (req, res) => {
    agency.findByIdAndDelete(req.params.id).then(function() {
        req.flash('message', "Xoá sản phẩm thành công ");
        res.redirect('/daily');
    })
})

router.get('/daily/sua-daily/:id', (req, res) => {
    agency.findById(req.params.id).then((data) => {
        res.send(data);
    })
})

router.post('/daily/sua-daily/:id', (req, res) => {
    const daily = {
        'name_agency': req.body.name_agency,
        'phone_agency': req.body.phone_agency,
        'area_agency': req.body.area_agency,
        'group_agency': req.body.group_agency,
        'address_agency': req.body.address_agency,
        'date_agency': req.body.date_agency
    };
    agency.findByIdAndUpdate(req.params.id, daily, { new: true, upsert: true }).then(() => {
        req.flash('message', "sửa sản phẩm thành công ");
        res.redirect('/daily')
    })
})

// group
router.post('/daily/them-group', (req, res) => {
    const groupA = new groupAgency({
        name_groupAgency: req.body.name_groupAgency
    })
    groupA.save().then(function() {
        req.flash('message', "Thêm loại đại lý thành công ");
        res.redirect('/daily');
    })
})

let groupNow;
router.get('/daily/sua-group/:id', (req, res) => {
    groupAgency.findById(req.params.id).then((data) => {
        res.send(data);
        groupNow = data.name_groupAgency;
    })
})

router.post('/daily/sua-group/:id', async(req, res) => {
    if (req.body.name_groupAgency == groupNow) {
        res.redirect('/daily');
    } else {
        const findGroup = await groupAgency.findOne({ 'name_groupAgency': req.body.name_groupAgency });
        if (findGroup) {
            var temp = findGroup.name_groupAgency;
            req.checkBody('name_groupAgency', "Đã tồn tại loại đại lý '" + temp + "'").not().equals(temp);

        }
        getError = req.validationErrors();
        if (getError) {
            res.redirect('/daily');
        } else {
            groupAgency.findByIdAndUpdate(req.params.id, { name_groupAgency: req.body.name_groupAgency }).then(() => {
                req.flash('message', "Sửa thành công từ '" + groupNow + "' thành '" + req.body.name_groupAgency + "'");
                res.redirect('/daily');
            });
        }
    }
})

router.get('/daily/xoa-group/:id', (req, res) => {
    groupAgency.findByIdAndDelete(req.params.id).then((data) => {
        req.flash('message', "Xoá thành công '" + data.name_groupAgency + "'");
        res.redirect('/daily');
    });
})

// area
router.post('/daily/them-area', (req, res) => {
    const areaA = new areaAgency({
        name_areaAgency: req.body.name_areaAgency
    })
    areaA.save().then(function() {
        req.flash('message', "Thêm khu vực đại lý thành công ");
        res.redirect('/daily');
    })
})
let areaNow;
router.get('/daily/sua-area/:id', (req, res) => {
    areaAgency.findById(req.params.id).then((data) => {
        res.send(data);
        areaNow = data.name_areaAgency;
    })
})

router.post('/daily/sua-area/:id', async(req, res) => {
    if (req.body.name_areaAgency == areaNow) {
        res.redirect('/daily');
    } else {
        const findArea = await areaAgency.findOne({ 'name_areaAgency': req.body.name_areaAgency });
        if (findArea) {
            var temp = findArea.name_areaAgency;
            req.checkBody('name_areaAgency', "Đã tồn tại Khu vực '" + temp + "'").not().equals(temp);

        }
        getError = req.validationErrors();
        if (getError) {
            res.redirect('/daily');
        } else {
            areaAgency.findByIdAndUpdate(req.params.id, { name_areaAgency: req.body.name_areaAgency }).then(() => {
                req.flash('message', "Sửa thành công từ '" + areaNow + "' thành '" + req.body.name_areaAgency + "'");
                res.redirect('/daily');
            });
        }
    }
})
router.get('/daily/xoa-area/:id', (req, res) => {
    areaAgency.findByIdAndDelete(req.params.id).then((data) => {
        req.flash('message', "Xoá thành công '" + data.name_areaAgency + "'");
        res.redirect('/daily');
    });
})
module.exports = router;