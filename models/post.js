var Db = require('./db');

function Post(user,post,query) {
    this.user = user;
    this.post = post;
    if(user) {

    }
    if(query){
        this.query = query;
    }
}

Post.prototype = {
   constructor: Post
    //获取已上传数据
   ,get: function (type,callback) {
       let that = this;
        Db(function (err,db) {
            let dbo = db.db(Db.name);
            dbo.collection(type).find(that.query).sort({_id: -1}).toArray(function (err,data) {
                callback(data);
                db.close();
            });
        });
    }
    //保存上传数据
    ,save: function (type,callback) {
       let that = this;
        Db(function (err,db) {
            let dbo = db.db(Db.name);
            console.log("数据库连接成功");
            dbo.collection(type).insertOne(that.post,function (err,res) {
                callback(res);
                db.close();
            });
        });
    }
    ,delete: function (type,callback) {
        let that = this;
        Db(function (err,db) {
            let dbo = db.db(Db.name);
            console.log("数据库连接成功");
            for(value in that.query) {
                dbo.collection(type).deleteOne(that.query[value], function (err, res) {
                    callback(res);
                });
                if(type == 'articles'){
                    dbo.collection('reviews').deleteMany({post_to: that.query[value]._id.toString()}, function (err,res) {
                        console.log(res);
                    });
                }
            }
        });
    }
    ,update: function (type,callback) {
        let that = this;
        Db(function (err,db) {
            let dbo = db.db(Db.name);
            dbo.collection(type).updateOne(that.query,that.post,function (err,data) {
                callback(data);
                db.close();
            });
        });
    }
};

module.exports = Post;