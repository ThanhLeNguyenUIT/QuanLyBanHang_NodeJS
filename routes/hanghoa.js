const express = require('express');
const router = express.Router();
const product = require("../model/product")
const { findByIdAndUpdate } = require('../model/product');
const category = require('../model/category');
var user = require('./authentication')
    // const isEmpty = v => {
    //     return Object.keys(v).length === 0;
    // };

//tim kiem
router.post('/hanghoa/search', function(req, res) {
    product.find({ 'id_product': req.body.searchPro }).then(function(prod) {
        category.find().then((cate) => {
            res.render('hanghoa', { product: prod, page: prod, cate: cate, errors: null, message: null, username: user.nameUser });
        })
    })
})

let getError = ''; // lấy lỗi từ các action 
router.get('/hanghoa', function(req, res) {
    product.find().sort({ id_product: 1 }).limit(20).then(function(num) {
        product.find().sort({ id_product: 1 }).limit(5).then(function(pro) {
            category.find().then((cate) => {
                res.render('hanghoa', { product: pro, page: num, cate: cate, errors: getError, message: req.flash('message'), username: user.nameUser });
                getError = '';
            })
        })
    })
})

// trang hàng hoá
router.get('/hanghoa/page:id', function(req, res) {
    product.find().sort({ id_product: 1 }).limit(20).then(function(num) {
        product.find().sort({ id_product: 1 }).skip((req.params.id - 1) * 5).limit(5).then(function(pro) {
            category.find().then((cate) => {
                res.render('hanghoa', { product: pro, page: num, cate: cate, errors: null, message: null, username: user.nameUser });

            })
        })
    })
})


//product
router.post('/hanghoa/them-hang', async(req, res) => {
    getError = '';
    req.checkBody('id_product', 'ID phải là số').isInt();
    const findPro = await product.findOne({ 'id_product': req.body.id_product });
    if (findPro) {
        req.checkBody('id_product', 'đã tồn tại sản phẩm').not().isIn(req.body.id_product);
    }

    req.checkBody('price', 'Giá bán phải là số').isInt();
    req.checkBody('ogn_price', 'Giá gốc phải là số').isInt();
    req.checkBody('exit', 'Tồn kho phải là số').isInt();
    getError = req.validationErrors();
    if (getError) {
        res.redirect('/hanghoa');
    } else {
        const pro = new product({
            id_product: req.body.id_product,
            name_product: req.body.name_product,
            price: req.body.price,
            category: req.body.category,
            ogn_price: req.body.ogn_price,
            type_product: req.body.type_product,
            exit: req.body.exit
        });

        req.flash('message', "Thêm sản phẩm thành công ");
        const saveProduct = await pro.save();
        res.redirect('/hanghoa');


    }
})

//xoá hàng
router.get("/hanghoa/deletePro/:id/", function(req, res) {
    product.findById(req.params.id, function(err, data) {
        data.remove(function() {
            req.flash('message', "xoá sản phẩm thành công ");
            res.redirect('/hanghoa');
        })
    })
})

//đưa data product cần sửa qua jquery
router.get('/hanghoa/update/:id', (req, res) => {
    product.findById(req.params.id).then((data) => {
        res.send(data);
    })
})

//update hàng hoá bằng id
router.post('/hanghoa/update/:id', (req, res) => {
    req.checkBody('price', 'Giá bán phải là số').isInt();
    req.checkBody('ogn_price', 'Giá gốc phải là số').isInt();
    req.checkBody('exit', 'Tồn kho phải là số').isInt();
    getError = req.validationErrors();
    if (getError) {
        console.log(getError)
        res.redirect('/hanghoa');
    } else {
        var pro = ({
            'name_product': req.body.name_product,
            'price': req.body.price,
            'category': req.body.category,
            'ogn_price': req.body.ogn_price,
            'type_product': req.body.type_product,
            'exit': req.body.exit
        })
        product.findByIdAndUpdate(req.params.id, pro, { new: true, upsert: true }).then(() => {
            req.flash('message', "Sửa sản phẩm thành công");
            res.redirect('/hanghoa');
        });
    }


})

router.get('/hanghoa/nhom:id', function(req, res) {
    product.find({ 'category': req.params.id }).then((data) => {
        category.find().then((cate) => {
            res.render('hanghoa', { product: data, page: data, cate: cate, errors: null, message: null, username: user.nameUser });
        })
    })
})

// category
router.post('/hanghoa/them-cate', async(req, res) => {
    getError = '';
    const findCate = await category.findOne({ 'name_category': req.body.name_category })
    if (findCate) {
        var temp = findCate.name_category;
        req.checkBody('name_category', "Đã tồn tại loại hàng '" + temp + "'").not().equals(temp);
        getError = req.validationErrors();
    }
    if (getError) {
        console.log(getError)
        res.redirect('/hanghoa');
    } else {
        const ca = new category({
            name_category: req.body.name_category
        })
        ca.save().then(() => {
            req.flash('message', "Thêm thành công '" + req.body.name_category + "'");
            res.redirect('/hanghoa')
        })
    }

})


router.get('/hanghoa/updateCate/:id', (req, res) => {
    category.findById(req.params.id).then((data) => {
        res.send(data);
        cateNow = data.name_category
    })
})

var cateNow; // xac nhan xem khi sửa có sửa lại đúng cate ban đầu
router.post('/hanghoa/edit-cate/:id', async(req, res) => {
    if (req.body.name_category == cateNow) {
        res.redirect('/hanghoa');
    } else {
        const findCate = await category.findOne({ 'name_category': req.body.name_category });
        if (findCate) {
            var temp = findCate.name_category;
            req.checkBody('name_category', "Đã tồn tại loại hàng '" + temp + "'").not().equals(temp);
            getError = req.validationErrors();
        }

        if (getError) {
            res.redirect('/hanghoa');
        } else {
            category.findByIdAndUpdate(req.params.id, { name_category: req.body.name_category }).then(() => {
                req.flash('message', "Sửa thành công từ '" + cateNow + "' thành '" + req.body.name_category + "'");
                res.redirect('/hanghoa');
            });
        }
    }

})

router.get('/hanghoa/deleteCate/:id', function(req, res) {
    category.findByIdAndDelete(req.params.id).then((data) => {
        req.flash('message', "Xoá thành công '" + data.name_category + "'");
        res.redirect('/hanghoa');
    });
})


module.exports = router;