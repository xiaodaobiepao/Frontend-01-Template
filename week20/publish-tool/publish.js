const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const { fstat } = require('fs')
const archiver = require('archiver')


// let filename = './cat.jpg'
let packname = './package'

// fs.stat(filename, (error, stat) => {
  // console.log(stat.size)
  const options = {
    host: 'localhost',
    port: 3000,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.directory(packname, false)

  // archive.pipe(fs.createWriteStream('./package.zip'))

  archive.finalize()

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

  archive.pipe(req)

  archive.on('end', () => {
    console.log('end')
    req.end()
  })

  // let readStream = fs.createReadStream('./cat.jpg')
  // readStream.pipe(req)

  // readStream.on('end', () => {
  //   req.end()
  // })
// })

// const postData = querystring.stringify({
//   'msg': 'Hello World zidingyineir'
// })

// const options = {
//   host: 'localhost',
//   port: '3000',
//   path: '/?filename=x.html',
//   method: 'GET'
// }
