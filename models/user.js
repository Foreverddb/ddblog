var Db = require('./db');
var util = require('util');

//创建User对象模型
function User(user) {
    this.name = user.name;
    this.password = user.pass;
}
//User原型对象
User.prototype = {
    constructor: User
    //检查用户名
    ,check: function (callback) {
        let that = this;
        Db(function (err, db) {
            if(err){
                callback(err);
            }
            let dbo = db.db(Db.name);
            console.log("已连接至数据库" + Db.name);
            let query = {
              name: that.name
            };
            dbo.collection('user').findOne(query,function (err, doc) {
                if(err){
                    console.log(err);
                    callback(err);
                }
                if(doc){
                    callback(err, doc);
                }
                else{
                    callback(err, false);
                }
                db.close();
            });
        });
    }
    //保存用户信息
    ,save: function (callback) {
        let that = this;
        Db(function (err, db) {
            if(err){
                callback(err);
            }
            let dbo = db.db(Db.name);
            console.log("已连接至数据库" + Db.name);
            let data = {
                name: that.name
                ,pass: that.password
            };
            console.log(util.inspect(data));
            dbo.collection('user').createIndex({'name':1});
            dbo.collection('user').insertOne(data,function (err, res) {
                if(err){
                    console.log(err);
                    callback(err);
                }
                if(res.acknowledged){
                    callback(err,res.acknowledged)
                }

                db.close();
            });
        });
    }
}
module.exports = User;
