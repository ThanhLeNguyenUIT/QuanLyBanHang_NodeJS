var express = require('express');
var router = express.Router();
var { userName }  = require('../routes/dashboard');

router.get('/baocao', function(req, res) {
    console.log(userName);
    res.render('baocao', {username: userName});
})

module.exports = router;