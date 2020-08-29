// console.log('heloo word')
// phantom.exit()

var page = require('webpage').create()
page.open('http://baidu.com', function(status) {
  console.log('status' + status)
  if (status === 'success') {
    var body = page.evaluate(function() {
      // console.log(document.body)
      // return document.title
      // return 'abc'
      // return document.body.tagName
      const toString = function(pad, element) {
        let children = element.children
        // console.log(children)
        let childrenString = ''
        for (let i = 0; i < children.length; ++i) {
          childrenString += toString('  ' + pad, children[i].tagName + '\n')
        }
        // return children[0].tagName
        return pad + element.tagName + '\n' + (children && children.length ? '\n' + childrenString : '')
      }
      return toString('', document.body)
    })
    // page.render('https://baidu.com')
    console.log(body)
  }
  phantom.exit()
})