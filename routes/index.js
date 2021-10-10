var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');
const ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  let post = new Post(req.session.user,null,{});
  post.get('articles',function (data) {
    res.render('page/index', {articles: data});
  });
});

//文章页面
router.get('/articles/:id',function (req,res,next) {
  let post = new Post(req.session.user,null,{_id: ObjectId(req.params.id)});
  post.get('articles',function (data) {
    let render_data = data[0];
    res.render('page/articles',{title:'DdBlog - ' + render_data.name,data: render_data});
  })
});
//评论处理
router.post('/reviews',function (req,res,next) {
  let post = new Post(req.session.user,null,{post_to: req.body.id});
  post.get('reviews',function (data) {
    res.send(JSON.stringify(data));
  })
});
router.post('/reviews/post',function (req,res,next) {
  if(!req.session.user){
    return res.redirect('/login');
  }
  let date = new Date();
  let post_content = {
    post_to: req.body.id
    ,user: req.session.user.name
    ,content: req.body.content
    ,time: date.toString()
  };
  let post = new Post(req.session.user,post_content,null);
  post.save('reviews',function (data) {
    res.send(JSON.stringify(data));
  })
});
router.post('/reviews/delete/:username',function (req,res,next) {
  console.log(req.params.username);
  if(req.session.user.name != req.params.username){
    return false;
  }
  let query = JSON.parse(req.body.data);
  for(value in query){
    query[value]._id = ObjectId(query[value]._id);
  }
  console.log(query);
  let post = new Post(req.session.user,{},query);
  let count = 0;
  post.delete('reviews',function (result) {
    count ++;
    console.log(count);
    if(count = query.length){
      res.send({acknowledged: true,count: count});
    }
    else {
      res.send({acknowledged: false});
    }
  });
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
  res.end(JSON.stringify({log:true}));
});
//上传文章或评论
router.post('/post',checkLogin);
router.post('/post',function (req,res,next) {

});


//检查登陆状态
function checkNotLogin(req,res,next) {
  if(req.session.user){
    return res.redirect('/');
  }
  next();
}
function checkLogin(req,res,next) {
  if(!req.session.user){
    res.send(JSON.stringify({log: false}));
    return res.redirect('/login');
  }
  next();
}

module.exports = router;