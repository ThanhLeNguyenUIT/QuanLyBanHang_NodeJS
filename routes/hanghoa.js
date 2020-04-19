var express = require('express');
var router = express.Router();

router.get('/hanghoa', function(req, res) {
    res.render('hanghoa')
})

module.exports = router;