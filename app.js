/// <reference path="./typings/main.d.ts" />
// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var User = require("./routes/user");
var cloud=require("./cloud");
// App 全局配置
app.set('views', path.join(__dirname, 'views'));   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.static('public'));

// 加载云代码方法
app.use(cloud);

app.use(bodyParser.urlencoded({
  extended: false
})); //extended为true，使用node内置qs解析数据，false时使用querystring

app.use(bodyParser.json({
  type: 'json'
})); //解析json类型数据

app.use(methodOverride());

app.use("/user", User);

app.get('/', function (req, res) {
  res.render('index');
});

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
