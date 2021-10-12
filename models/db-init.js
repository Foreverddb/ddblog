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
    var md5 = crypto.createHash('md5');
    var task = 0;

    dbo.createCollection('user',function (err,res) {
        if(err){
            throw err;
        }
        console.log('已创建集合user');
        dbo.collection('user').insertOne({
            name: config.admin.username
            ,pass: md5.update(config.admin.password).digest('base64')
        },function (err,res) {
            if(err){
                throw err;
            }
            console.log("创建管理员账户：" + res.acknowledged);
            task ++;
            checkLoad();
        });
    });
    dbo.createCollection('reviews',function (err,res) {
        if(err){
            throw err;
        }
        console.log('已创建集合reviews');
        task ++;
    });
    dbo.createCollection('articles',function (err,res) {
        if(err){
            throw err;
        }
        console.log('已创建集合articles');
        task ++;

    });

    function checkLoad() {
        if(task == 3){
            console.log('初始化数据库完成！');
            db.close(function () {
                console.log('数据库连接已关闭！请运行 npm start 命令以运行博客框架！');
            });
        }
    }


});