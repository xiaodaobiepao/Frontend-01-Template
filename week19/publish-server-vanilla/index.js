const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  // res.
  console.log(req)
  let matched = req.url.match(/filename=([^&]+)/)
  let filename = ( matched && matched[1] )
  console.log(filename)
  if (!filename) return
  let writeStream = fs.createWriteStream("../server/public/" + filename)
  req.pipe(writeStream)
  req.on('end', () => {
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end('okay')
  })
})

server.listen(3000)