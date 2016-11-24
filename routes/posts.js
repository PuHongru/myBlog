/**
 * Created by puhongru on 2016/11/17.
 */
var express = require('express');
var router = express.Router();

var PostModel = require('../models/posts');

var checkLogin = require('../middlewares/check').checkLogin;

//  GET /posts �����û����ض��û�������ҳ
//  eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
    res.render('posts');
});

//  POST /posts ����һƪ����
router.post('/',checkLogin, function (req, res, next) {
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.title;

    // У�����
    try{
        if (!title.length) {
            throw new Error('����д����');
        }
        if (!content.length) {
            throw new Error('����д����');
        }
    } catch(e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    // ��д�����ݿ����������
    var post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    };
    // ����������д�����ݿ�
    PostModel.create(post)
        .then(function (result) {
            // �� post �ǲ��� mongodb ���ֵ������ _id
            post = result.ops[0];
            req.flash('success','����ɹ�');
            // ����ɹ�����ת��������ҳ
            res.redirect('/posts/${post._id}');
        }).catch(next);
});

//  GET /posts/create ��������ҳ
router.get('/create',checkLogin, function (req, res, next) {
    res.render('create');
});

//  GET /posts/:postId ����һƪ������ҳ
router.get('/:postId', function (req, res, next) {
    res.send(req.flash());
});

//  GET /posts/:postId/edit ��������ҳ
router.get('/:postId/edit', checkLogin,function (req, res, next) {
    res.send(req.flash());
});

//  POST /posts/:postId/edit ����һƪ����
router.post('/:postId/edit',checkLogin,function (req, res, next) {
    res.send(req.flash());
});

//  GET /posts/:postId/remove ɾ��һƪ����
router.get('/:postId/remove',checkLogin, function (req, res, next) {
    res.send(req.flash());
});

//  POST /posts/:postId/comment ����һ������
router.post('/:postId/comment',checkLogin, function (req, res, next) {
    res.send(req.flash());
});

//  GET /posts/:postId/comment/:commentId/remove ɾ��һ������
router.get('/:postId/comment/:commentId/remove',checkLogin, function (req, res, next) {
    res.send(req.flash());
});

module.exports = router;