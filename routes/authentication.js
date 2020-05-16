var express = require('express');
var router = express.Router();

router.get('/authentication', function(req, res) {
    res.render('authentication');
})

module.exports = router;