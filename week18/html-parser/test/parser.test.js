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
  // console.log('2text', text)
  assert.equal(text.type, 'text')
  assert.equal(text.content, 'hello world!')
})

it('tag mismatch', () => {
  try {
    let doc = parseHtml('<div></viv>')
  } catch (error) {
    assert.equal(error.message, "Tag start end doesn't match!")
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
  let doc = parseHtml(`<div test id=abc AB=he class = 'cls'doouble="dobble" data=></div>`)
  let div = doc.children[0]
  console.log(div)
  let count = 0
  for (let  attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, "abc")
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, '')
    }
  }
  assert.equal(count, 3)
  // assert.ok()
})

it('self close', () => {
  let doc = parseHtml("<img />")
  doc = parseHtml("<img/>")
  let img = doc.children[0]
  assert.equal(img.tagName, 'img')
  doc = parseHtml("<img/ >")
  // assert.ok()
})

it('no end tagName', () => {
  let doc = parseHtml('<div></>')
})

it('script', () => {
  let doc = parseHtml(`<script>
    <div>abcd</div>
    <span>x</span>
    <
    </s
    </sc
    </scr
    </scri
    </scrip
    </script
  </script>`)
})

it('parse a complete html', () => {
  let doc = parseHtml(htmlStr)
  // console.log(doc.children[0])
  let html = doc.children[0]
  assert.equal(html.tagName, 'html')
  assert.equal(html.attributes[0].name, 'maaa')
})