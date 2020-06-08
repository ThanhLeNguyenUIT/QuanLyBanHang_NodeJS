var express = require('express');
var router = express.Router();
var product = require("../model/product")
var cate = require('../model/category')

var dataPro;
var numPage;
router.get('/hanghoa', function(req, res) {
    product.find().sort({ id_product: 1 }).limit(20).then(function(proe) {
        numPage = proe
        product.find().sort({ id_product: 1 }).limit(5).then(function(pro) {
            cate.find().then((cate) => {
                dataPro = pro;
                res.render('hanghoa', { product: pro, prod: proe, cate: cate });
            })

        })
    })
})

router.get('/hanghoa', (req, res) => {

})
router.get('/hanghoa/page:id', function(req, res) {

    product.find().sort({ id_product: 1 }).limit(20).then(function(proe) {
        numPage = proe;
        product.find().sort({ id_product: 1 }).skip((req.params.id - 1) * 5).limit(5).then(function(pro) {
            cate.find().then((cate) => {
                dataPro = pro;
                res.render('hanghoa', { product: pro, prod: proe, cate: cate });
            })
        })
    })
})
router.post('/hanghoa/them-hang', function(req, res) {

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
        res.redirect('/hanghoa');
    })
})


router.post('/hanghoa/search', function(req, res) {
    product.find({ id_product: req.body.searchPro }).then(function(prod) {
        res.render('hanghoa', { product: prod, prod: prod });
    })
})

router.get("/hanghoa/deletePro/:id/", function(req, res) {
    product.findById(req.params.id, function(err, data) {
        data.remove(function() {
            console.log("da xoa thanh cong");
            res.redirect('/hanghoa');
        })
    })
})



router.get("/hanghoa/:id", function(req, res) {
    product.findById(req.params.id).then((data) => {
        res.render('hanghoa', { product: dataPro, prod: numPage })
    })
})
router.post('/hanghoa/them-cate', (req, res) => {
    var ca = new cate({
        id_category: req.body.id_categor,
        name_category: req.body.name_category
    })
    ca.save().then(() => {
        res.redirect('/hanghoa')
    })
})
router.post('/hanghoa/edit-cate', (req, res) => {
    var ca = new cate({
        id_category: req.body.id_categor,
        name_category: req.body.name_category
    })
    ca.save().then(() => {
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