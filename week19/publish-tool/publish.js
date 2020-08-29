const http = require('http')
const querystring = require('querystring')

const postData = querystring.stringify({
  'msg': 'Hello World zidingyineir'
})

// const options = {
//   host: 'localhost',
//   port: '3000',
//   path: '/?filename=x.html',
//   method: 'GET'
// }

const options = {
  host: 'localhost',
  port: 3000,
  path: '/?filename=test3.html',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Length': Buffer.byteLength(postData)
  }
}

const req = http.request(options, res => {
  console.log(`STATUS ${res.statusCodd}`)
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  // res.setEncoding('utf8')
  // res.on('data', chunk => {
  //   console.log(`BODY: ${chunk}`)
  // })
  // res.on('end', () => {
  //   console.log('No more data in response')
  // })
})
req.on('error', err => {
  console.error(`problem with request: ${err.message}`)
})

req.write(postData)
req.end()