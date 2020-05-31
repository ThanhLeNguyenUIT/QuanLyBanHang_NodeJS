var express = require('express');
var router = express.Router();
var product = require("../model/product")
var cate = require('../model/category')
    // router.get('/hanghoa', function(req, res) {
    //     res.redirect('hanghoa')
    // })
router.get('/hanghoa', function(req, res) {
    product.find().then(function(pro) {
        res.render('hanghoa', { product: pro });
    })
})
router.post('/hanghoa', function(req, res) {
    var pro = new product({
        id_product: req.body.id_product,
        name_product: req.body.name_product,
        price: req.body.price,
        category: req.body.category,
        ogn_price: req.body.ogn_price,
        type_product: req.body.type_product,
        exit: req.body.exit
    })
    pro.save().then(function() {
        res.redirect('/hanghoa')
    })
})

function checkAdmin(req, res, next) {

    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('../views/authentication');
    }
}

module.exports = router;