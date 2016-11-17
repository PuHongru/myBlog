/**
 * Created by puhongru on 2016/11/17.
 */
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//  GET /signup ×¢²áÒ³Ãæ
router.get('/',checkNotLogin, function (req, res, next) {
    res.send(req.flash());
});

//  POST /signup ÓÃ»§×¢²á
router.post('/',checkNotLogin, function (req, res, next) {
    res.send(req.flash());
});

module.exports = router;