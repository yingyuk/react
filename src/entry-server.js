// 服务器渲染
var { createServer } = require('http');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var { StaticRouter } = require('react-router');
var App = require('./App');

createServer((req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
    res.end()
  }
}).listen(3000);