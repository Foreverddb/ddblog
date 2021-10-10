var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var mongoStore = require('connect-mongo');
var expressSession = require('express-session');
var db_config = require('./models/db-config');
var util = require('util');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: db_config.cookieSecret,
  store: mongoStore.create({mongoUrl: db_config.host + db_config.name})
}));

//视图助手，来控制登录与否的视图变化
app.use(function (req,res,next){
  res.locals.motto = 'A brief blog for listening';//顶部导航栏显示语句
  res.locals.long_motto = 'Just for turly Brief, to create a better iframe.';//背景长语句
  res.locals.blog_title = 'DdBlog';//主页主标题
  res.locals.title = 'DdBlog 博客系统';//网页标题
  res.locals.adminName = db_config.admin.username;
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

