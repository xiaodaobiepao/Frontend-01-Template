function create(Cls, attributes, ...children) {
  let o
  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({ timer: 'timer' })
  }
  for (let name in attributes) {
    o.setAttribute(name, attributes[name])
  }
  for (let child of children) {
    o.appendChild(child)
  }
  return o
}

class Wrapper {
  constructor(type) {
    // console.log('config', config )
    this.children = []
    this.root = document.createElement(type)
  }
  setAttribute(name, value) { // attribute
    // console.log(name, value)
    this.root.setAttribute(name, value)
  }
  appendChild(child) {
    // console.log('child', child)
    // console.log(this.root)
    // child.mountTo(this.root)
    // this.root.appendChild(child)
    this.children.push(child)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
    for (let child of this.children) {
      if (typeof child === 'string') {
        child = new Text(child)
      }
      child.mountTo(this.root)
    }
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

class Parent {
  constructor() {
    // console.log('config', config )
    this.children = []
    this.root = document.createElement('div')
  }
  setAttribute(name, value) { // attribute
    // console.log(name, value)
    this.root.setAttribute(name, value)
  }
  appendChild(child) {
    // console.log('child', child)
    console.log(this.root)
    child.mountTo(this.root)
    // this.root.appendChild(child)
    this.children.push(child)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Child {
  constructor() {
    // console.log('config', config )
    this.children = []
    this.root = document.createElement('div')
  }
  setAttribute(name, value) { // attribute
    // console.log(name, value)
    this.root.setAttribute(name, value)
  }
  appendChild(child) {
    // console.log('child', child)
    child.mountTo(this.root)
    // this.root.appendChild(child)
    this.children.push(child)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class MyComponent {
  constructor() {
    this.children = []
    // this.root = document.createElement('div')
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(child) {
    this.child.push(child)
    // this.slot.appendChild(child)
  }
  render() {
    return <article>
      <header>I'm a header</header>
      {this.slot}
      <footer>I'm a footer</footer>
    </article>
  }
  mountTo(parent) {
    this.slot = <div></div>
    for (let child of this.children) {
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)
    // parent.appendChild(this.root)
  }
}

// let component = <Parent id="a" class="b">
//   <Child></Child>
//   <Child></Child>
//   <Child></Child>
// </Parent>

// console.log(component)
// component.mountTo(document.body)
// let component = <Cls id="a" />
// component.id = 'a'

// let component = <div id="divid" class="divclass">
//   <div></div>
//   <div></div>
//   <div></div>
// </div>

// let component = <div>text</div>
let component = <div>{new Wrapper()}</div>
component.mountTo(document.body)