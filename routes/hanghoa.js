var express = require('express');
var router = express.Router();
var product = require("../model/product")
var cate = require('../model/category');
const { findByIdAndUpdate } = require('../model/product');
const category = require('../model/category');

var cateExit;
router.get('/hanghoa', function(req, res) {
    product.find().sort({ id_product: 1 }).limit(20).then(function(proe) {
        product.find().sort({ id_product: 1 }).limit(5).then(function(pro) {
            cate.find().then((cate) => {
                cateExit = cate;
                res.render('hanghoa', { product: pro, page: proe, cate: cate });
            })
        })
    })
})

router.get('/hanghoa', (req, res) => {

})
router.get('/hanghoa/page:id', function(req, res) {

    product.find().sort({ id_product: 1 }).limit(20).then(function(proe) {
        product.find().sort({ id_product: 1 }).skip((req.params.id - 1) * 5).limit(5).then(function(pro) {
            cate.find().then((cate) => {
                res.render('hanghoa', { product: pro, page: proe, cate: cate });
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
    product.find({ 'id_product': req.body.searchPro }).then(function(prod) {
        cate.find().then((cate) => {
            res.render('hanghoa', { product: prod, page: prod, cate: cate });
        })
    })
})

router.get("/hanghoa/deletePro/:id/", function(req, res) {
    product.findById(req.params.id, function(err, data) {
        data.remove(function() {
            console.log("da xoa thanh cong", data.name_product);
            res.redirect('/hanghoa');
        })
    })
})

router.post('/hanghoa/them-cate', (req, res) => {
    var ca = new cate({
        id_category: req.body.id_category,
        name_category: req.body.name_category
    })
    ca.save().then(() => {
        res.redirect('/hanghoa')
    })
})

router.get('/hanghoa/update/:id', (req, res) => {
    product.findById(req.params.id).then((data) => {
        res.send(data);
    })
})

router.get('/hanghoa/updateCate/:id', (req, res) => {
    cate.findById(req.params.id).then((data) => {
        res.send(data);
    })
})

router.post('/hanghoa/update', (req, res) => {
    var filter = { 'id_product': req.body.id_product };
    var pro = ({
        'name_product': req.body.name_product,
        'price': req.body.price,
        'category': req.body.category,
        'ogn_price': req.body.ogn_price,
        'type_product': req.body.type_product,
        'exit': req.body.exit
    })
    console.log(pro)
    product.findOneAndUpdate(filter, pro, { new: true, upsert: true }).then(() => {
        res.redirect('/hanghoa');
    });
})
router.post('/hanghoa/edit-cate', (req, res) => {
    var filter = { 'name_category': req.body.name_category };
    var cate = ({
        'name_category': req.body.name_category
    })
    category.findOneAndUpdate(filter, cate, { upsert: true }).then(() => {
        res.redirect('/hanghoa');
    });
})

router.get('/hanghoa/deleteCate', function(req, res) {
    var filter = { 'id_category': req.body.id_category };
    category.findOneAndDelete(filter).then(() => {
        res.redirect('/hanghoa');
    });
})

router.get('/hanghoa/nhom:id', function(req, res) {
    product.find({ 'category': req.params.id }).then((data) => {
        cate.find().then((cate) => {

            res.render('hanghoa', { product: data, page: data, cate: cate });

        })
    })
})
module.exports = router;