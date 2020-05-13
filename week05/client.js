const net = require('net')
class HttpRequest {
  // method url
  // body
  constructor(options) {
    this.options = options
    this.open()
  }
  
  open() {
    const options = this.options
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.body = options.body || body
    this.path = options.path || '/'
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']) {
      // 如果未设置content-Type头部
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }
    
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    }
    this.headers['Content-Length'] = this.bodyText.length
  }
  send(connection) {
    // console.log(this.options)
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
          // connection.write('POST / HTTP/1.1\r\n')
          // connection.write('Host: 127.0.0.1\r\n')
          // connection.write('Content-Length: 20\r\n')
          // connection.write('Content-Type: application/x-www-form-urlencoded\r\n')
          // // connection.write('Content-Type: application/x-www-form-urlencoded')
          // connection.write('\r\n')
          // connection.write('field1=aaa&code=x%3D1')
        })
      }
      connection.on('data', data => {
        // resolve(data.toString())
        if (parser.isFinished) {
          parser.receiveChar(data.toString())
        }
        connection.end()
      })

      connection.on('end', () => {
        console.log('disconnected from server')
      })

      connection.on('error', err => {
        reject(err)
        console.log('请求错误', err)
      })
    })
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`
  }

}

class ResponseParser {
  constructor () {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_NAME_END = 3;
    this.WAITING_HEADER_SPACE = 4;
    this.WAITING_HEADER_VALUE = 5;
    this.WAITING_HEADER_LINE_END = 6;
    this.WAITING_HEADER_BLOCK_END = 7;
    this.WAITING_BODY = 8;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';

    this.bodyParser = null;
  }

  get isFinished () {
    return this.bodyParser && this.bodyParser.isFinished
  }

  get response () {
    this.statusLine.match(/^HTTP\/1\.1 ([1-5]\d{2}) (\w+)/);
    return {
      statusCode: RegExp.$1,
      statusTxet: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  receive (string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar (char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      this.current = this.WAITING_HEADER_NAME;
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
      } else if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      this.current = this.WAITING_HEADER_VALUE
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      this.current = this.WAITING_HEADER_NAME
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      this.current = this.WAITING_BODY
      if (this.headers['Transfer-Encoding'] === 'chunked') {
        this.bodyParser = new ChunkedBodyParser()
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char)
    }
  }
}

class ChunkedBodyParser {
  constructor () {
    this.READING_LENGTH_FIRSR_CHAR = 0;
    this.READING_LENGTH = 1;
    this.READING_LENGTH_END = 2;
    this.READING_CHUNK = 3;
    this.READING_CHUNK_END = 4;
    this.BODY_BLOCK_END = 5;

    this.current = this.READING_LENGTH_FIRSR_CHAR;
    this.content = []
    this.chunkLength = 0
  }

  get isFinished () {
    return this.current === this.BODY_BLOCK_END
  }

  receiveChar (char) {
    if (this.current === this.READING_LENGTH_FIRSR_CHAR) { // Length的第一个字符是单独一个状态
      if (char === '0') { // Length的第一个字符是'0'的话就是终止块
        this.current = this.BODY_BLOCK_END;
      } else {
        this.chunkLength += Number(`0x${char}`); // chunk-length在包体是16进制
        this.current = this.READING_LENGTH;
      }
    } else if (this.current === this.READING_LENGTH) {
      if (char === '\r') {
        this.current = this.READING_LENGTH_END;
      } else {
        this.chunkLength = this.chunkLength * 16 + Number(`0x${char}`);
      }
    } else if (this.current === this.READING_LENGTH_END) {
      this.current = this.READING_CHUNK;
    } else if (this.current === this.READING_CHUNK) {
      if (char === '\r') {
        this.current = this.READING_CHUNK_END
        this.chunkLength = 0
      } else if (this.chunkLength > 0) {
        this.content.push(char);
        this.chunkLength -= 1;
      }
    } else if (this.current === this.READING_CHUNK_END) {
      this.current = this.READING_LENGTH_FIRSR_CHAR;
    }
  }
}

let request = new HttpRequest({
  method: 'POST',
  host: '127.0.0.1',
  port: '8888',
  body: {
    name: 'chenchao'
  },
  headers: {
    'x-cc': 'ccha'
  }
})

console.log(request.toString())
request.send()



// const client = net.createConnection({
//   host: 'localhost',
//   port: 8888
// }, () => {
//   console.log('connect server')
  // client.write('POST / HTTP/1.1\r\n')
  // client.write('Host: 127.0.0.1\r\n')
  // client.write('Content-Length: 20')
  // client.write('Content-Type: application/x-www-form-urlencoded\r\n')
  // // client.write('Content-Type: application/x-www-form-urlencoded')
  // client.write('\r\n')
  // client.write('field1=aaa&code=x%3D1')
  // // client.write('\r\n')
// })

// client.on('data', data => {
//   console.log(data.toString())
//   client.end()
// })

// client.on('end', () => {
//   console.log('disconnected from server')
// })