var express = require('express');
var router = express.Router();
var util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('page/index', { title: 'test API' , url: '/hello'});
});

router.get('/reg', function (req, res){
  res.render('page/reg',{title: '用户注册'});
});
router.post('/reg', function (req, res) {
  let data = {
    user_exist: false
  };
  res.end(JSON.stringify(data));
});


module.exports = router;