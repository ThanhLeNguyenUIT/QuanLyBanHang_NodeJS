var express = require('express');
var router = express.Router();
var user = require('./authentication')

router.get('/dashboard', function(req, res) {
    res.render('dashboard', { username: user.nameUser });
})


module.exports = router;