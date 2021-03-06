import { create, Text, Wrapper } from './createElement'
import { TimeLine, Animation } from './animation'
import { ease } from './cubicBezier'

export class Panel {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }
  setAttribute(name, value) {
    this[name] = value
  }
  appendChild(child) {
    this.children.push(child)
  }
  render() {
    // this.childViews = 
    // this.titleView = 
    return <div class="panel">
      <h1 style="background-color: lightgreen;width:300px;margin:0;">{this.title}</h1>
      <div style="border: 1px solid lightgreen;">
        {this.children.map(child => <div style="width:300px;min-height:300px;">{child}</div>)}
      </div>
    </div>
  }
  mountTo(parent) {
    this.render().mountTo(parent)
  }
}

// let component = <Carousel data={[
//   'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg ',
//   'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg ',
//   'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg ',
//   'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg ',
// ]}></Carousel>

// component.mountTo(document.getElementById('container'))
// import {TimeLine, Animation} from './animation'
// import {cubicBezier} from './cubicBezier'
// // let linear = t => t
// let ease = cubicBezier(.25, .1, .25, 1)
// let el = document.getElementById('el')
// let pauseBtn = document.getElementById('pause-btn')
// let resumeBtn = document.getElementById('resume-btn')
// let restartBtn = document.getElementById('restart-btn')
// console.log(el)
// let tl = new TimeLine()
// pauseBtn.addEventListener('click', () => {
//   tl.pause()
// })
// resumeBtn.addEventListener('click', () => {
//   tl.resume()
// })
// restartBtn.addEventListener('click', () => {
//   tl.restart()
// })
// tl.add(new Animation(el.style, 'transform', v => `translateX(${v}px)`, 0, 200, 5000, 0, ease))
// setTimeout(() => {
//   tl.add(new Animation(el2.style, 'transform', v => `translateX(${v}px)`, 0, 200, 5000, 0, ease), 0)
// }, 2000)
// tl.start()
// document.getElementById('el2').style.transform = "translateX(200px)"