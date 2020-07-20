var express = require('express');
var router = express.Router();
var product = require("../model/product");
var bill = require('../model/bill');
var billInfo = require('../model/billInfo');
var cate = require('../model/category');
var user = require('./authentication')

var UserName;
router.get('/baocao', function(req, res) {
    product.find().sort({ id_product: 1 }).then((data) => {
        bill.find().then((billItem) => {
            res.render('baocao', { product: data, username: UserName, bill: billItem, username: user.nameUser });
        })
    })
})

router.get("/baocao/deleteBill/:id/", function(req, res) {
    bill.findById(req.params.id, function(err, data) {
        data.remove(function() {
            req.flash('message', "xoá bill thành công ");
            res.redirect('/baocao');
        })
    })
})

module.exports = router;