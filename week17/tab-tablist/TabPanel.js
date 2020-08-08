import { create, Text, Wrapper } from './createElement'
import { TimeLine, Animation } from './animation'
import { ease } from './cubicBezier'

export class TabPanel {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    this.state = Object.create(null)
  }
  setAttribute(name, value) {
    this[name] = value
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
    console.log(this.children)
    this.childViews = this.children.map(child => <div style="width:300px;min-height:300px;">{child}</div>)
    this.titleViews = this.children.map((child, i) => <span onClick={() => {console.log('hehe');this.select(i)}} style="display:inline-block;">{child.title || 'title'}</span>)
    return <div class="panel">
      <h1 style="background-color: lightgreen;width:400px;margin:0;">{this.titleViews}</h1>
      <div>
        {this.childViews}
      </div>
    </div>
  }
  mountTo(parent) {
    this.render().mountTo(parent)
  }
}