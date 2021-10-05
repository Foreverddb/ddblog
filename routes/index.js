var express = require('express');
var router = express.Router();
var url = require('url');
var util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'test API' , url: '/hello'});
});

router.get('/hello',function (req,res){
  res.redirect('/');
})
// router.get('/hello*',function(req, res, next){
//   res.send('hello,' + url.parse(req.url, true).query.name);
// });
// router.post('/hello*',function(req,res,next){
//   res.send(req.body.name + ',nice to meet you');
// });

router.get('/reg',function (req, res) {
  
});

module.exports = router;