var express = require('express');
var router = express.Router();
var product = require("../model/product")
var cate = require('../model/category')

router.get('/order',(req,res) => {
    product.find().sort({id_product: req.body.searchProduct}).then((data) => {
        res.render('order',{product: data});
    })
})

router.post('/order/search', function(req, res) {
    product.find({ id_product: req.body.searchProduct }).then(function(prod) {
        res.render('order', { product: prod });
    })
})
module.exports = router;