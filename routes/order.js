var express = require('express');
var router = express.Router();
var product = require('../model/product');
var bill1 = require('../model/bill');
var billInfo = require('../model/billInfo');
var agency = require('../model/agency');
var authentication = require('../routes/authentication');

router.get('/order',(req,res) => {
    let userName = authentication.getUser;
    console.log(userName);
    product.find().sort({id_product: req.body.searchProduct}).then((data) => {
        res.render('order', {product: data, userName: userName})
    })
})

// tìm tất cả hàng hoá để gửi dữ liệu về cho ajax
router.get('/order/search', function(req, res) {
    product.find().sort({id_product: req.body.searchProduct}).then((data) => {
        res.send(data);
    })
})

// tìm hàng hoá theo id để gửi dữ liệu cho ajax
router.get('/order/search/:id', (req, res) => {
    product.findById(req.params.id).then((data) => {
        res.send(data);
    })
})

// tìm tất cả Đại lí để gửi dữ liệu cho ajax
router.get('/order/searchAgency', (req,res) => {
    agency.find().sort({id_agency: req.body.searchAgency}).then(data => {
        res.send(data);
    })
})

// tìm Đại lí theo id để gửi dữ liệu cho ajax
router.get('/order/searchAgency/:id', (req, res) => {
    agency.findById(req.params.id).then((data) => {
        res.send(data);
    })
})

// tạo bill mới
router.post('/order/addBill/', function(req,res){
    console.log(req.body.accountName);
    try{
        const bill = new bill1({
            name_account: req.body.accountName,
            name_agency: req.body.agencyName,
            date: req.body.dateCheckIn,
            total_money: req.body.finalPrice
        })
        const saveBill =  bill.save();
    } catch(err){
        console.log(err);
    }
    res.redirect('/order');
})
module.exports = router;