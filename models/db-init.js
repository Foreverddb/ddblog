const config = require('./db-config');
var MongoClient = require('mongodb').MongoClient;
const url = config.host + config.name;

//测试数据库连接，创建所需集合
MongoClient.connect(url, function (err,db) {
    if(err){
        throw err;
    }
    console.log("已连接至数据库" + config.name);
    let dbo = db.db(config.name);
    dbo.createCollection('user',function (err,res) {
        if(err){
            throw err;
        }
        console.log('已创建集合user');
    });
});