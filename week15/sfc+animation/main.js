// import { create, Text, Wrapper } from './createElement'
// // import { Carousel } from './carousel.vue'

// class Carousel {
//   constructor(config) {
//     this.children = []
//     this.attributes = new Map()
//     this.properties = new Map()
//   }
//   setAttribute(name, value) {
//     this[name] = value
//   }
//   appendChild(child) {
//     this.children.push(child)
//   }
//   render() {
//     let children = this.data.map(url => {
//       let element = <img src={url} />
//       element.addEventListener('dragstart', event => event.preventDefault())
//       return element
//     })
//     let root = <div class="carousel">
//       {children}
//     </div>

//     let position = 0
//     let nextPic = () => {
//       let nextPosition = (position + 1) % this.data.length
//       let current = root.childNodes[position]
//       let next = root.childNodes[nextPosition]

//       current.style.transition = 'ease 0s'
//       next.style.transition = 'ease 0s'
//       current.style.transform = `translateX(${-100 * position}%)`
//       next.style.transform = `translateX(${100 - 100 * nextPosition}%)`
//       // setTimeout(() => {
//       //   current.style.transition = 'ease 1s'
//       //   next.style.transition = 'ease 1s'
//       //   current.style.transform = `translateX(${-100 * position - 100}%)`
//       //   next.style.transform = `translateX(${-100 * nextPosition}%)`
//       //   position = nextPosition
//       // }, 16)
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           current.style.transition = 'ease 1s'
//           next.style.transition = 'ease 1s'
//           current.style.transform = `translateX(${-100 * position - 100}%)`
//           next.style.transform = `translateX(${-100 * nextPosition}%)`
//           position = nextPosition
//         })
//       })
//       setTimeout(nextPic, 3000)
//     }
//     // setTimeout(nextPic, 3000)
//     root.addEventListener('mousedown', event  => {
//       let startX = event.clientX, startY = event.clientY
//       let nextPosition = (position + 1) % this.data.length
//       let lastPosition = (position - 1 + this.data.length) % this.data.length
//       let next = root.childNodes[nextPosition]
//       let current = root.childNodes[position]
//       let last = root.childNodes[lastPosition]

//       last.style.transition = 'none'
//       current.style.transition = 'none'
//       next.style.transition = 'none'

//       last.style.transform = `translateX(${ -500 - 500 * lastPosition}px)`
//       current.style.transform = `translateX(${-500 * position}px)`
//       next.style.transform = `translateX(${500 - 500 * nextPosition}px)`
//       let move = event => {
//         current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
//         last.style.transform =  `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
//         next.style.transform =  `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`
//         // console.log(event.clientX)
//       }
//       let up = event => {
//         let offset = 0
//         if (event.clientX - startX > 250) {
//           offset = 1
//         } else if  (event.clientX - startX < -250) {
//           offset = -1
//         }
//         last.style.transition = 'none'
//         current.style.transition = 'none'
//         next.style.transition = 'none'

//         current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
//         last.style.transform =  `translateX(${offset * 500  - 500 - 500 * lastPosition}px)`
//         next.style.transform =  `translateX(${offset * 500  + 500 - 500 * nextPosition}px)`
//         position = (position - offset + this.data.length) % this.data.length
//         document.removeEventListener('mousemove', move)
//         document.removeEventListener('mouseup', up)
//       }
//       document.addEventListener('mousemove', move)
//       document.addEventListener('mouseup', up)
//     })
//     return root
//   }
//   mountTo(parent) {
//     this.render().mountTo(parent)
//   }
// }

// let component = <Carousel data={[
//   'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg ',
//   'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg ',
//   'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg ',
//   'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg ',
// ]}></Carousel>

// component.mountTo(document.body)
import {TimeLine, Animation} from './animation'
import {cubicBezier} from './cubicBezier'
// let linear = t => t
let ease = cubicBezier(.25, .1, .25, 1)
let el = document.getElementById('el')
let pauseBtn = document.getElementById('pause-btn')
let resumeBtn = document.getElementById('resume-btn')
let restartBtn = document.getElementById('restart-btn')
console.log(el)
let tl = new TimeLine()
pauseBtn.addEventListener('click', () => {
  tl.pause()
})
resumeBtn.addEventListener('click', () => {
  tl.resume()
})
restartBtn.addEventListener('click', () => {
  tl.restart()
})
tl.add(new Animation(el.style, 'transform', v => `translateX(${v}px)`, 0, 200, 5000, 0, ease))
setTimeout(() => {
  tl.add(new Animation(el2.style, 'transform', v => `translateX(${v}px)`, 0, 200, 5000, 0, ease), 0)
}, 2000)
tl.start()
// document.getElementById('el2').style.transform = "translateX(200px)"