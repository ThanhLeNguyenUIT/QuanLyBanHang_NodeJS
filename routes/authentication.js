var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('authentication');
})

router.get('/authentication', (req, res) => {
    res.render('authentication');
})

module.exports = router;