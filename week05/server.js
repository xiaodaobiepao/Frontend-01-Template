const http = require('http')

const server = http.createServer((req, res) => {
  console.log("request received")
  console.log(req.headers)
  res.setHeader('Content-type', 'text/html')
  res.setHeader('x-Foo', 'cc')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('哈哈哈')
})

server.listen(8888)