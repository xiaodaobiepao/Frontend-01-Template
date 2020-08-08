import { create, Text, Wrapper } from './createElement'
import { TimeLine, Animation } from './animation'
import { ease } from './cubicBezier'

export class ListView {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    this.state = Object.create(null)
  }
  setAttribute(name, value) {
    this[name] = value
  }
  getAttribute(name) {
    return this[name]
  }
  appendChild(child) {
    this.children.push(child)
  }
  select(i) {
    console.log('select')
    for (let view of this.childViews) {
      view.style.display = 'none'
    }
    this.childViews[i].style.display = ''
    // for (let titleView of this.titleViews) {
    //   titleView.style.display = 'none'
    // }
    // this.titleViews[i].style.display = ''
    // this.titleView.innerText = this.children[i].title
  }
  render() {
    let data = this.getAttribute('data')
    console.log('data', data)
    return <div class="list-view" style="width: 300px;">
      {
        data.map(this.children[0])
      }
    </div>
  }
  mountTo(parent) {
    this.render().mountTo(parent)
  }
}