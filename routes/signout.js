/**
 * Created by puhongru on 2016/11/17.
 */
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

//  GET /signout �ǳ�
router.get('/',checkLogin, function (req, res, next) {
    res.send(req.flash());
});

module.exports = router;