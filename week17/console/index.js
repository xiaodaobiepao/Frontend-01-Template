// var tty = require('tty')
var ttys = require('ttys')
// var readline = require('readline')

// var stdin = ttys.stdin
var stdout = ttys.stdout

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// async function ask(content) {
//   return new Promise((resolve, rejet) => {
//     rl.question(content, answer => {
//       resolve(answer)
//     })
//   })
// }

// void async function () {
//   console.log(await ask('hahahehe?'))
// }()

// stdout.write('Hello   world!\n')
// stdout.write('\033[1A')
// stdout.write('xiaodao\n')

var stdin = process.openStdin()
stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')

function getChar() {
  return new Promise(resolve => {
    stdin.once('data', key => {
      resolve(key)
    })
  })
}

function up(n = 1) {
  stdout.write('\033[' + n + 'A')
}
function down(n = 1) {
  stdout.write('\033[' + n + 'B')
}
function right(n = 1) {
  stdout.write('\033[' + n + 'C')
}
function left(n = 1) {
  stdout.write('\033[' + n + 'D')
}

void async function () {
  stdout.write('小伙子，想要那个框架啊?\n')
  const result = await select(['vue', 'react', 'yicat', 'tmxmall'])
  stdout.write('您选择了' + result)
  process.exit()
}()

async function select(choices) {
  let curSelect = 0
  for (let i = 0; i < choices.length; ++i) {
    let choice = choices[i]
    if (i === curSelect) {
      stdout.write('[x]' + choice + '\n')
    } else {
      stdout.write('[ ]' + choice + '\n')
    }
  }
  up(choices.length)
  right()
  while (true) {
    let char = await getChar()
    if (char === '\u0003') {
      process.exit()
      break
    }
    if (char === 'w' && curSelect > 0) {
      stdout.write(' ')
      left()
      curSelect--
      up()
      stdout.write('x')
      left()
    }
    if (char === 's' && curSelect < choices.length - 1) {
      stdout.write(' ')
      left()
      curSelect++
      down()
      stdout.write('x')
      left()
    }
    if (char === '\r') {
      down(choices.length - curSelect)
      left()
      return choices[curSelect]
    }
    // console.log(char.split('').map(c => c.charCodeAt(0)))
  }
}