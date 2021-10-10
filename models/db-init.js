const config = require('./db-config');
var MongoClient = require('mongodb').MongoClient;
const url = config.host + config.name;
const crypto = require('crypto');

//测试数据库连接，创建所需集合
MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("已连接至数据库" + config.name);
    let dbo = db.db(config.name);

    // dbo.createCollection('user',function (err,res) {
    //     if(err){
    //         throw err;
    //     }
    //     console.log('已创建集合user');
    // });
    // dbo.createCollection('reviews',function (err,res) {
    //     if(err){
    //         throw err;
    //     }
    //     console.log('已创建集合reviews');
    // });
    // dbo.createCollection('articles',function (err,res) {
    //     if(err){
    //         throw err;
    //     }
    //     console.log('已创建集合articles');
    // });
    // var md5 = crypto.createHash('md5');
    // dbo.collection('user').insertOne({
    //     name: config.admin.username
    //     ,pass: md5.update(config.admin.password).digest('base64')
    // },function (err,res) {
    //     if(err){
    //         throw err;
    //     }
    //     console.log("创建管理员账户：" + res.acknowledged);
    // });

    // let date = new Date();
    // let newdate = new Date(date.getTime() + 3600*8*1000);
    // dbo.collection('articles').insertOne({
    //     name: 'Hello World'
    //     ,time: newdate.toString()
    //     ,content: 'Hello World!It looks like that you have successfully build the blog'
    //     ,image: 'https://cdn.w3cbus.com/mdui.org/docs/assets/docs/img/card.jpg'
    // },function (err,res) {
    //     if(err){
    //         throw err;
    //     }
    //     console.log("创建测试文章：" + res.acknowledged);
    // });

});