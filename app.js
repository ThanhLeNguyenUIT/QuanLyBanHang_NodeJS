var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var dashboard = require("./routes/dashboard");
var baocao = require("./routes/baocao");
var daily = require("./routes/daily");
var hanghoa = require("./routes/hanghoa");
var order = require('./routes/order');
var authentication = require('./routes/authentication');
var account = require('./routes/account');

//ma hoa password
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

var path = require('path');

var expressValidator = require('express-validator');
const { use } = require('passport');
const category = require('./model/category');
const product = require('./model/product');
var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const url = 'mongodb://127.0.0.1:27017/agency_data';
<<<<<<< HEAD
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    const col = db.collection('products');
    col.aggregate([{
        $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: 'name_category',
            as: 'categoryJoin'
        }
    }]).toArray(function(err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
    });
    const cate = db.collection('categories')
    cate.aggregate([{
        $lookup: {
            from: 'products',
            localField: 'name_category',
            foreignField: 'category',
            as: 'productList'
        }
    }], function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    category.find().then((data) => { console.log(data) })

    console.log("connect to database");
=======
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err,db) => {
    // if(err) throw err;
    // const bill = db.collection('bill');
    // bill.aggregate([
    //     {$lookup: {
    //         from: 'billInfo',
    //         localField: '_id',
    //         foreignField: 'id_bill',
    //         as: 'billList'
    //     }}
    // ])
    console.log('Connect to database');
>>>>>>> faa9cbd37906b5baf10f96c290a6366eb9e47861
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/resource", express.static('resource'));
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}))
app.use(flash());

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
app.use('/', authentication);
app.use('/', dashboard);
app.use('/', dashboard);
app.use('/', daily);
app.use('/', hanghoa);
app.use('/', baocao);
app.use('/', order);
app.use('/', account);


// app.use(passport.initialize());
// app.use(passport.session());

module.exports = app;