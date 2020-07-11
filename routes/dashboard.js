var express = require('express');
var router = express.Router();
//const  userName  = require('../routes/authentication').userName;
var userName = 'thanh';
router.get('/dashboard', function(req, res) {
    res.render('dashboard', {username: userName});
})

module.exports = router;