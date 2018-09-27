const Vue = require('vue')
const server = require('express')()

const app = new Vue({
  template: `<div>hhhhhhhhhh</div>`
})

const renderer = require('vue-server-renderer').createRenderer()

const log = console.log.bind(console)

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>url是 ：{{url}}</div>`
  })
  renderer.renderToString(app).then(html => {
    res.header("Content-Type", "text/html; charset=utf-8")
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  }).catch(err => {
    if (err) {
      res.sendStatus(500).end('server error')
    }
  })

})
server.listen(8080)
