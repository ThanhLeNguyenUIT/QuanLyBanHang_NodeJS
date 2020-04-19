var express = require('express');
var router = express.Router();

router.get('/baocao', function(req, res) {
    res.render('baocao')
})

module.exports = router;