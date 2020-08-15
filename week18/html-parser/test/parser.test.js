const { parseHtml } = require('../src/parser.js')
const assert = require('assert')

const htmlStr = `<html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
.container{
  display: flex;
  background-color: rgb(255,192,203);
  width: 200px;
  height: 110px;
}
.content {
  width: 100px;
  height: 100px;
  background-color: rgb(0,128,0);
}
</style>
</head>
<body>
    <div class="container">
        <div class="content"></div>
        <div class="content"></div>
    </div>
</body>
</html>`

it('parse a single element', () => {
  let doc = parseHtml('<div></div>')
  let div = doc.children[0]
  assert.equal(div.tagName, 'div')
  assert.equal(div.children.length, 0)
  assert.equal(div.type, 'element')
  assert.equal(div.attributes.length, 0)
})

it('parse a text element', () => {
  let doc = parseHtml('<div>hello world!</div>')
  let text = doc.children[0].children[0]
  console.log('2text', text)
  assert.equal(text.type, 'text')
  assert.equal(text.content, 'hello world!')
})

it('tag mismatch', () => {
  try {
    let doc = parseHtml('<div></viv>')
  } catch (error) {
    // console.log(error)
    assert.equal(error.message, 'Tag start end doesnt match')
  }
})

it('parse a style tag', () => {
  let doc = parseHtml('<style>div {width: 100px;}</style>')
  let style = doc.children[0]
  // console.log('2style', style)
  assert.equal(style.tagName, 'style')
  assert.equal(style.children.length, 1)
  assert.equal(style.type, 'element')
  assert.equal(style.attributes.length, 0)
})

it('text with <', () => {
  let doc = parseHtml("<div>a < b</div>")
  let text = doc.children[0].children[0]
  assert.equal(text.type, 'text')
  assert.equal(text.content, 'a < b')
})

it('with property', () => {
  let doc = parseHtml("<div id=abc></div>")
  let div = doc.children[0]
  assert.equal(div.type, 'element')
  assert.equal(div.attributes.length, 1)
  assert.equal(div.attributes[0].name, 'id')
  assert.equal(div.attributes[0].value, 'abc')
})

it('parse a complete html', () => {
  let doc = parseHtml(htmlStr)
  // console.log(doc.children[0])
  let html = doc.children[0]
  assert.equal(html.tagName, 'html')
  assert.equal(html.attributes[0].name, 'maaa')
})