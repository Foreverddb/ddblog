const config = require('./db-config');
var MongoClient = require('mongodb').MongoClient;
const url = config.host + config.name;

MongoClient.connect(url, function(err, db) {
    if (err){
        throw err;
    }
    let dbs = db.db(config.name);
    // console.log(dbs);
    // dbs.createCollection('adaasd',function (err,db) {
    //     console.log('创建成功');
    // });
    console.log("已连接至数据库: " + name);

});