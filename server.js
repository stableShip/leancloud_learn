var AV = require('leanengine');

var APP_ID = process.env.LC_APP_ID || 'ha5kle2da62blxnaucp2oe34rtgonb5uzosc4d2a1nh55qpi';
var APP_KEY = process.env.LC_APP_KEY || '9si359l2p97tz2jz1uocv9cqp9malkmod6c8v3gez3djpph3';
var MASTER_KEY = process.env.LC_APP_MASTER_KEY || 'mxbiqen48n5yws8chjhdl9u6azde2d72x2flm6w1igvmcl10';

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./app');

// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LC_APP_PORT || 3000);
var server = app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
});
