var config = {
  name: 'ddblog'//数据库名
  ,host: 'mongodb://localhost:27017/'//数据库地址
  ,cookieSecret: 'ddblog'//生存cookie的密码串
  //配置管理员账号
  ,admin:{
    username: 'admin'//用户名
    ,password: '1234567'//密码
  }
};
module.exports = config;