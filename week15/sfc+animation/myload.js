var parser = require('./parser2.js')
module.exports = function (source, map) {
  // console.log('my loader is running!!!', source)
  let tree = parser.parseHTML(source)
  // console.log(tree.children[1].children[0].content)
  let template = null
  let script = null
  for (let node of tree.children) {
    if (node.tagName === 'template') {
      template = node.children.filter(e => e.type !== 'text')[0]
    } else if (node.tagName === 'script') {
      script = node.children[0].content
    }
  }
  // console.log(template)
  // let createCode = ''
  let visit = (node) => {
    if (node.type === 'text') {
      return JSON.stringify(node.content)
    }
    let attrs = {}
    for (let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value
    }
    let children = node.children.map(node => visit(node))
    return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
  }
  let createCode = visit(template)
  const res = `
import { create, Text, Wrapper } from "./createElement"
export class Carousel {
  setAttribute(name, value) {
    this[name] = value
  }
  render() {
    return ${createCode}
  }
  mountTo(parent){
    this.render().mountTo(parent)
  }
}`

console.log(res)
return res
}