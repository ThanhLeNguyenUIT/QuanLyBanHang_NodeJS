var express = require('express');
var router = express.Router();
var authentication = require('./authentication')

router.get('/dashboard', function(req, res) {
    res.render('dashboard', { username: authentication.User.name });
})


module.exports = router;