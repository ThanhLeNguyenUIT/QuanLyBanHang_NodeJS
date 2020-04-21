var express = require('express');
var router = express.Router();

router.get('/order',(req,res) => {
    res.render('order');
})

module.exports = router;