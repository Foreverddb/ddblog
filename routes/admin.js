var express = require('express');
var router = express.Router();
var config = require('../models/db-config');
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');

let md5 = crypto.createHash('md5');
let true_pass = md5.update(config.admin.password).digest('base64');

router.get('/',function (req,res,next) {
    if(req.session.user.name == config.admin.username && req.session.user.password == true_pass){
        res.render('page/admin',{
            right: req.session.user.admin
        });
    }else {
        res.redirect('/admin');
    }
});
router.post('/identify',function (req,res,next) {
    if(req.body.password == config.admin.password){
        req.session.user.admin = true;
    }
    else {
        req.session.user.admin = false;
    }
    res.send(JSON.stringify({right: req.session.user.admin}));
});

router.post('/articles',function (req,res,next) {
    if(req.session.user.admin){
        let post = new Post(req.session.user, null, {});
        post.get('articles', function (data) {
            console.log(data);
            res.render('page/admin/articles', {
                right: true
                ,articles: data
            });
        });
    } else {
        return res.send('你没有权限');
    }
});

router.post('/reviews',function (req,res,next) {
    if(req.session.user.admin){
        let post = new Post(req.session.user, null, {});
        post.get('reviews', function (data) {
            console.log(data);
            res.render('page/admin/reviews', {
                right: true
                ,reviews: data
            });
        });
    } else {
        return res.send('你没有权限');
    }
});

router.get('/create',function (req,res,next) {
    if(req.session.user.admin){
        res.render('page/admin/create',{
            right: true
        });
    }else {
        res.send('你没有权限！');
    }
});

module.exports = router;