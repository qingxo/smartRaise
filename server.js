'use strict';

// 倚赖
const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const helmet = require('helmet');
const compression = require('compression')
const config = require('./config');
const qiniu = require('qiniu')
const bucket = config.bucket

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

// express 实例
const app = express();

// 设置 HTTP 头
// reference: http://expressjs.com/zh-cn/advanced/best-practice-security.html
app.use(helmet());

// 开启 gzip 压缩
// reference: http://expressjs.com/zh-cn/advanced/best-practice-performance.html
app.use(compression());

// 静态资源服务
app.use(express.static(path.join(__dirname, 'dist')));

//构建上传策略函数
app.get('/uploadToken', function(req, res) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket);
  res.send({"uptoken": putPolicy.token()})
})

// api proxy
app.use('/api', proxy(config.api, {
  proxyReqPathResolver: function(req, res) {
    return require('url').parse("/pc" + req.url).path;
  }
}));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

const port = config.port || process.env.PORT
app.listen(port, function() {
  console.log('🌎 => App is running on port %s', port)
})
