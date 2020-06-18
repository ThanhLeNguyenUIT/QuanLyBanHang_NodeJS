const express = require('express');
const router = express.Router();
const product = require("../model/product")
const { findByIdAndUpdate } = require('../model/product');
const category = require('../model/category');
const { productValidation, cateValidation } = require('../resource/js/validation');

router.get('/hanghoa', function(req, res) {
    product.find().sort({ id_product: 1 }).limit(20).then(function(proe) {
        product.find().sort({ id_product: 1 }).limit(5).then(function(pro) {
            category.find().then((cate) => {
                res.render('hanghoa', { product: pro, page: proe, cate: cate });
            })
        })
    })
})

router.get('/hanghoa/page:id', function(req, res) {

    product.find().sort({ id_product: 1 }).limit(20).then(function(proe) {
        product.find().sort({ id_product: 1 }).skip((req.params.id - 1) * 5).limit(5).then(function(pro) {
            category.find().then((cate) => {
                res.render('hanghoa', { product: pro, page: proe, cate: cate });
            })
        })
    })
})
router.post('/hanghoa/them-hang', async(req, res) => {
    const { error } = productValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // check product if exist
    const idExist = await product.findOne({ id_product: req.body.id_product });
    if (idlExist) {
        return res.status(400).send('Id sản phẩm đã tồn tại')
    }

    const pro = new product({
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
        category.find().then((cate) => {
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

router.post('/hanghoa/them-cate', async(req, res) => {
    const { error } = cateValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // check cate if exist
    const cateExist = await category.findOne({ name_category: req.body.name_category });
    if (cateExist) {
        return res.status(400).send('cate has already exist')
    }
    const ca = new category({
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
    category.findById(req.params.id).then((data) => {
        res.send(data);
        console.log(data)
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
    product.findOneAndUpdate(filter, pro, { new: true, upsert: true }).then(() => {
        res.redirect('/hanghoa');
    });
})
router.post('/hanghoa/edit-cate/:id', (req, res) => {
    category.findByIdAndUpdate(req.params.id, { name_category: req.body.name_category }).then(() => {
        res.redirect('/hanghoa');
    });
})

router.get('/hanghoa/deleteCate/:id', function(req, res) {
    category.findByIdAndDelete(req.params.id).then((data) => {
        console.log('đã xoá thành công ' + data.name_category)
        res.redirect('/hanghoa');
    });
})

router.get('/hanghoa/nhom:id', function(req, res) {
    product.find({ 'category': req.params.id }).then((data) => {
        category.find().then((cate) => {
            res.render('hanghoa', { product: data, page: data, cate: cate });
        })
    })
})
module.exports = router;