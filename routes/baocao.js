var express = require('express');
var router = express.Router();
var product = require("../model/product")
var cate = require('../model/category')
var { userName }  = require('../routes/dashboard');

router.get('/baocao', function(req, res) {
    product.find().sort({id_product: 1}).then((data) => {
        res.render('baocao', {product: data, username: userName});
    })
})

module.exports = router;