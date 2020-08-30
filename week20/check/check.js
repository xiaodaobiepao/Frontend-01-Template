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
      var toString = function(pad, element) {
        var children = element.children
        var childrenString = ''
        if (children) {
          for (var i = 0; i < element.children.length; ++i) {
            childrenString += toString('  ' + pad, element.children[i]) + '\n'
          }
        }
        // return children[0].tagName
        var name
        if (element.nodeType === Node.TEXT_NODE) {
          name = '#text' + JSON.stringify(element.textContent)
        }
        if (element.nodeType === Node.ELEMENT_NODE) {
          name = element.tagName
        }
        return pad + name + (children && children.length ? '\n' + childrenString : '')
      }
      return toString('', document.body)
      // return document.body.children.length
    })
    // page.render('https://baidu.com')
    console.log(body)
  }
  phantom.exit()