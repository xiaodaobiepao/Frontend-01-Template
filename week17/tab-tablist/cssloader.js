let css = require('css')
// var parser = require('./parser2.js')
module.exports = function (source, map) {
  // console.log('my loader is running!!!', source)
  let stylesheet = css.parse(source)
  let name = this.resourcePath.match(/([^\\]+).css$/)[1]
  console.log(name)
  // console.log(stylesheet)
  for (let rule of stylesheet.stylesheet.rules) {
    // console.log(rule)
    rule.selectors = rule.selectors.map(selector => selector.match(new RegExp(`^.${name}`)) ? selector : `.${name} ${selector}` )
  }
  console.log(css.stringify(stylesheet))
  return `
  let style = document.createElement('style')
  style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))}
  document.documentElement.appendChild(style)
  `
}