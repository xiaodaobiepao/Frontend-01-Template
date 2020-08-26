// import { create, Text, Wrapper } from '../lib/createElement'
// import { Carousel } from './Carousel'



// let component = <Carousel data={[
//   'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg ',
//   'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg ',
//   'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg ',
//   'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg ',
// ]}></Carousel>

// component.mountTo(document.getElementById('container'))

module.exports = {
  add: 'add'
}
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