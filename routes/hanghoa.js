var express = require('express');
var router = express.Router();
var product = require("../model/product")

router.get('/hanghoa', function(req, res) {
    res.render('hanghoa')
})

module.exports = router;