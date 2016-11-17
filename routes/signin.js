/**
 * Created by puhongru on 2016/11/17.
 */
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//  GET /signin µÇÂ¼Ò³
router.get('/',checkNotLogin, function (req, res, next) {
    res.send(req.flash());
});

//  POST /signin ÓÃ»§µÇÂ¼
router.post('/',checkNotLogin, function (req, res, next) {
    res.send(req.flash());
});

module.exports = router;