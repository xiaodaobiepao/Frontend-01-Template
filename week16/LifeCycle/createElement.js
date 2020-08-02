import { enableGesture } from "./gesture"

export function create(Cls, attributes, ...children) {
  let o
  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({ timer: 'timer' })
  }
  for (let name in attributes) {
    o.setAttribute(name, attributes[name])
  }
  let visit = children => {
    for (let child of children) {
      if (Array.isArray(child)) {
        visit(child)
        continue
      }
      if (typeof child === 'string') {
        child = new Text(child)
      }
      o.appendChild(child)
    }
  }
  visit(children)
  return o
}

class Wrapper {
  constructor(type) {
    // console.log('config', config )
    this.children = []
    this.root = document.createElement(type)
  }
  get style() {
    return this.root.style
  }
  setAttribute(name, value) { // attribute
    // console.log(name, value)
    // console.log(name)
    if (name.match(/^on([\s\S]+)$/)) {
      const eventName = RegExp.$1.replace(/^[\s\S]{1}/, c => c.toLowerCase())
      // console.log(value)
      this.root.addEventListener(eventName, value)
      return
    }
    if (name === 'enableGesture') {
      enableGesture(this.root)
      return
    }
    this.root.setAttribute(name, value)
  }
  appendChild(child) {
    // console.log('child', child)
    // console.log(this.root)
    // child.mountTo(this.root)
    // this.root.appendChild(child)
    this.children.push(child)
  }
  addEventListener() {
    this.root.addEventListener(...arguments)
  }
  mountTo(parent) {
    for (let child of this.children) {
      // if (typeof child === 'string') {
      //   child = new Text(child)
      // }
      child.mountTo(this.root)
    }
    parent.appendChild(this.root)
  }
}

class Text {
  constructor(text) {
    this.children = []
    this.root = document.createTextNode(text)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}