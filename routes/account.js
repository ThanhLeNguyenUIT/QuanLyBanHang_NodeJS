var express = require('express');
var router = express.Router();
var User = require('../model/user');
var user = require('./authentication')

let getErrors = '';
router.post('/searchAccount', (req, res) => {
    User.find({ 'email': req.body.searchAccount }).then((data) => {
        console.log(data)
        res.render('account', { acc: data, errors: null, message: null, username: user.nameUser });
    })
})

router.get('/accountAdmin', function(req, res) {

    User.find({ 'category_account': 'Admin' }).sort({ name: 1 }).then((data) => {
        res.render('account', { acc: data, errors: null, message: null, username: user.nameUser })
    })
})
router.get('/accountNV', function(req, res) {

    User.find({ 'category_account': 'Nhân viên' }).sort({ name: 1 }).then((data) => {
        res.render('account', { acc: data, errors: null, message: null, username: user.nameUser })
    })

})

router.get('/taikhoan', (req, res) => {
    User.find().sort({ name: 1 }).then((data) => {
        res.render('account', { acc: data, errors: getErrors, message: req.flash('message'), username: user.nameUser })
    })
})

router.post('/taikhoan/them-taikhoan', async(req, res) => {
    req.checkBody('email', 'Vui lòng nhập Email').isEmail();
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        req.checkBody('email', 'Đã tồn tại Email').not().equals(emailExist.email);
    }
    getErrors = req.validationErrors();
    if (getErrors) {
        res.redirect('/taikhoan')
    } else {
        const account = new User({
            name: req.body.name_account,
            email: req.body.email,
            password: req.body.password,
            category_account: req.body.category_account,
            sexual: req.body.sexual,
            address_account: req.body.address_account,
            phone_account: req.body.phone_account,
            date: req.body.dateBegin,
            salary: req.body.salary
        })
        account.save().then(function() {
            req.flash('message', "thêm tài khoản thành công");
            res.redirect('/taikhoan')
        })
    }
})

router.get("/taikhoan/xoa-taikhoan/:id", function(req, res) {
    User.findByIdAndDelete(req.params.id).then(function() {
        req.flash('message', "xoá sản phẩm thành công ");
        res.redirect('/taikhoan');
    })
})

router.get('/taikhoan/sua-taikhoan/:id', (req, res) => {
    User.findById(req.params.id).then(function(data) {
        res.send(data);
    })
})

router.post('/taikhoan/sua-taikhoan/:id', (req, res) => {

    getError = req.validationErrors();
    if (getError) {
        console.log(getError)
        res.redirect('/taikhoan');
    } else {
        var acc = ({
            'name': req.body.name_account,
            'password': req.body.password,
            'category_account': req.body.category_account,
            'sexual': req.body.sexual,
            'address_account': req.body.address_account,
            'phone_account': req.body.phone_account,
            'date': req.body.dateBegin,
            'salary': req.body.salary
        })
        User.findByIdAndUpdate(req.params.id, acc, { new: true, upsert: true }).then(() => {
            req.flash('message', "Sửa tài khoản thành công");
            res.redirect('/taikhoan');
        });
    }
})

function getIDAuto(id) {
    User.find().then((data) => {
        id = 0;
        data.forEach(element => {
            if (element._id > id) {
                id = element._id
            }
        });
        return id;
    })

}

module.exports = router;