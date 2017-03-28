// 开发环境下的入口文件之一
require('eventsource-polyfill'); // 浏览器事件总线的 垫片
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

// 热刷新
hotClient.subscribe(function(event) {
    console.warn('event', event);
    if (event.action === 'reload') {
        window.location.reload();
    }
});
