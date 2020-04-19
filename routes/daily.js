var express = require('express');
var router = express.Router();

router.get('/daily', function(req, res) {
    res.render('daily')
})

module.exports = router;