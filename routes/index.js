var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('page/index', { title: 'DdBlog 博客'});
});

//注册页面路由处理
router.get('/reg',checkNotLogin);
router.get('/reg', function (req, res){
  res.render('page/reg',{title: '用户注册'});
});
router.post('/reg', function (req, res) {
  let username = req.body.username;
  let md5 = crypto.createHash('md5');
  let password = md5.update(req.body.password).digest('base64');
  let user = new User({
    name: username
    ,pass: password
  });
  let data = {};
  user.check(function (err,user_exist) {
    if(err){
      throw err;
    }
    if(user_exist){
      data.user_exist = true;
      res.end(JSON.stringify(data));
    }
    else {
      user.save(function (err,result) {
        if(err){
          throw err;
        }
        if(result){
          data.acknowledged = result;
          res.end(JSON.stringify(data));
        }
      });
    }
  });
});

//登录页面路由处理
router.get('/login',checkNotLogin);
router.get('/login', function (req, res){
  res.render('page/login',{title: '用户登录'});
});
router.post('/login', function (req, res) {
  let username = req.body.username;
  let md5 = crypto.createHash('md5');
  let password = md5.update(req.body.password).digest('base64');
  let user = new User({
    name: username
    ,pass: password
  });
  user.check(function (err, user_obj){
    if(err){
      console.log(err);
    }
    if(user_obj){
      var data;
      if(password == user_obj.pass){
        req.session.user = user;
        data = {
          acknowledged: true
        };
      }
      else {
        data = {
          acknowledged: false
        };
      }
    }
    else {
      data = {
        acknowledged: false
      };
    }
    res.end(JSON.stringify(data));
  });
});

//设置登出路由
router.post('/logout',checkLogin);
router.post('/logout',function (req,res,next) {
  req.session.user = null;
  res.end(JSON.stringify({logout:true}));
});

function checkNotLogin(req,res,next) {
  if(req.session.user){
    return res.redirect('/');
  }
  next();
}
function checkLogin(req,res,next) {
  if(!req.session.user){
    res.send(JSON.stringify({logout: false}));
    return false;
  }
  next();
}

module.exports = router;