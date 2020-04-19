var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var dashboard = require("./routes/dashboard");
var baocao = require("./routes/baocao");
var daily = require("./routes/daily");
var hanghoa = require("./routes/hanghoa");


var expressValidator = require('express-validator');
var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set("views", "./views");

const url = 'mongodb://127.0.0.1:27017/agent_managerment';
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/resource", express.static('resource'));


// app.use(expressValidator({
//     errorFormatter: function(param, msg, value) {
//         var namespace = param.split('.'),
//             root = namespace.shift(),
//             formParam = root;

//         while (namespace.length) {
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param: formParam,
//             msg: msg,
//             value: value
//         };
//     }
// }));

app.use('/', dashboard);
app.use('/', dashboard);
app.use('/', daily);
app.use('/', hanghoa);
app.use('/', baocao);

module.exports = app;