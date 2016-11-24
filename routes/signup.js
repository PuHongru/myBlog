/**
 * Created by puhongru on 2016/11/17.
 */
var path = require('path');
var sha1 = require('sha1');  // 用于加密
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//  GET /signup 注册页面
router.get('/',checkNotLogin,function (req, res, next) {
    console.log(req.session.user);
    res.render('signup');
});

//  POST /signup 用户注册
router.post('/',checkNotLogin, function (req, res, next) {
    var name = req.fields.name;
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;

    // 校验参数
    try{
        if(!(name.length >= 1 && name.length <= 10)){
            throw new Error('名字请限制在1-10个字符');
        }
        if(['m','f','x'].indexOf(gender) === -1){
            throw new Error('性别只能是男、女、保密');
        }
        if(!req.files.avatar.name){
            throw new Error('缺少头像');
        }
        if(!(bio.length >= 1 && bio.length <= 30)){
            throw new Error('个人简介请限制在1-30个字符');
        }
        if(password.length < 6){
            throw new Error('密码至少6个字符');
        }
        if(password !== repassword){
            throw new Error('两次输入的密码不一样');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/signup'); // 重定向
    }

    // 明文密码加密
    password = sha1(password);

    // 待写入数据库的用户信息
    var user = {
        name: name,
        password: password,
        avatar: avatar,
        gender: gender,
        bio: bio
    };
    // 用户信息写入数据库
    UserModel.create(user)
        .then(function (result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            user = result.ops[0];
            // 将用户信息存入session
            delete user.password;
            req.session.user = user;
            // 写入flash
            req.flash('success','注册成功');
            // 跳转到首页
            res.redirect('/posts');
        })
        .catch (function (e) {
            // 用户名被占用则跳回注册页
            if(e.message.match('E11000 duplicate key')){
                req.flash('error','用户名已经被占用');
                return res.redirect('/signup');
            }
            next();
        });
});

module.exports = router;