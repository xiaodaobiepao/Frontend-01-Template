import { create, Text, Wrapper } from '../lib/createElement'
import { TimeLine, Animation } from './animation'
import { ease } from './cubicBezier'

import { enableGesture } from './gesture'

export class Carousel {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    this.timeline = new TimeLine
  }
  setAttribute(name, value) {
    this[name] = value
  }
  appendChild(child) {
    this.children.push(child)
  }
  pause() {
    this.timeline.pause()
  }
  render() {
    let nextPicStopHandler = null
    let children = this.data.map((url, currentPosition) => {
      let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length
      let nextPosition = (currentPosition + 1) % this.data.length
      let offset = 0
      let startX = 0
      let onStart = event => {
        this.pause()
        clearTimeout(nextPicStopHandler)
        let curElement = children[currentPosition]
        console.log(curElement)
        let currentTransformValue = Number(curElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])
        console.log(currentTransformValue)
        offset = currentTransformValue + 500 * position
        // startX = event.clientX
      }
      let onPanmove = event => {
        let lastElement = children[lastPosition]
        let curElement = children[currentPosition]
        let nextElement = children[nextPosition]
        let currentTransformValue = 500 * currentPosition + offset
        let lastTransformValue = -500 - 500 * lastPosition + offset
        let nextTransformValue = 500 - 500 * nextPosition + offset
        console.log(event)
        let dx = event.detail.dx
        console.log(dx)
        curElement.style.transform = `translateX(${currentTransformValue + dx}px)`
        lastElement.style.transform = `translateX(${lastTransformValue + dx}px)`
        nextElement.style.transform = `translateX(${nextTransformValue + dx}px)`
      }
      let onEnd = event => {
        let direction = 0
        let dx = event.detail.dx
        if (dx + offset > 250) {
          direction = 1
        } else if (dx + offset < -250) {
          direction = -1
        }
        let lastElement = children[lastPosition]
        let curElement = children[currentPosition]
        let nextElement = children[nextPosition]
        this.timeline.restart()
        console.log('direciton', direction)
        // this.timeline.start()
        // let currentTransformValue = 500 * currentPosition + offset + dx
        // let lastTransformValue = -500 - 500 * lastPosition + offset + dx
        // let nextTransformValue = 500 - 500 * nextPosition + offset + dx
        if (direction) {
          console.log('offset', offset)
          console.log('currentPosition', currentPosition)
          console.log('shs', - 500 * currentPosition + direction * 500)
          let currentAnimation = new Animation(curElement.style, 'transform', v => `translateX(${v}px)`, -500 * currentPosition + offset + dx, - 500 * currentPosition + direction * 500, 500, 0, ease)
          let lastAnimation = new Animation(lastElement.style, 'transform', v => `translateX(${v}px)`, -500 - 500 * lastPosition + offset + dx, -500 - 500 * lastPosition + direction * 500, 500, 0, ease)
          let nextAnimation = new Animation(nextElement.style, 'transform', v => `translateX(${v}px)`, 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease)
          this.timeline.add(currentAnimation)
          this.timeline.add(lastAnimation)
          this.timeline.add(nextAnimation)
        }
      }
      let element = <img onStart={onStart} onEnd={onEnd} onPanmove={onPanmove} src={url} enableGesture={true} />
      element.style.transform = 'translateX(0)'
      element.addEventListener('dragstart', event => event.preventDefault())
      return element
    })
    let root = <div class="carousel">
      {children}
    </div>

    let position = 0
    let rootDom = root.root
    this.timeline.start()
    let nextPic = () => {
      console.log(position)
      let nextPosition = (position + 1) % this.data.length
      let current = rootDom.childNodes[position]
      let next = rootDom.childNodes[nextPosition]
      let currentAnimation = new Animation(current.style, 'transform', (v => `translateX(${v}px)`), -500 * position, - 500 - 500 * position, 500, 0, ease)
      let nextAnimation = new Animation(next.style, 'transform', (v => `translateX(${v}px)`), 500 - 500 * nextPosition, -500 * nextPosition, 500, 0, ease)
      this.timeline.add(currentAnimation)
      this.timeline.add(nextAnimation)
      position = nextPosition

      // current.style.transition = 'ease 0s'
      // next.style.transition = 'ease 0s'
      // current.style.transform = `translateX(${-100 * position}%)`
      // next.style.transform = `translateX(${100 - 100 * nextPosition}%)`
      // setTimeout(() => {
      //   current.style.transition = 'ease 1s'
      //   next.style.transition = 'ease 1s'
      //   current.style.transform = `translateX(${-100 * position - 100}%)`
      //   next.style.transform = `translateX(${-100 * nextPosition}%)`
      //   position = nextPosition
      // }, 16)
      // requestAnimationFrame(() => {
      //   requestAnimationFrame(() => {
      //     current.style.transition = 'ease 1s'
      //     next.style.transition = 'ease 1s'
      //     current.style.transform = `translateX(${-100 * position - 100}%)`
      //     next.style.transform = `translateX(${-100 * nextPosition}%)`
      //     position = nextPosition
      //   })
      // })
      nextPicStopHandler = setTimeout(nextPic, 3000)
    }
    nextPicStopHandler = setTimeout(nextPic, 3000)
    // rootDom.addEventListener('mousedown', event  => {
    //   let startX = event.clientX, startY = event.clientY
    //   let nextPosition = (position + 1) % this.data.length
    //   let lastPosition = (position - 1 + this.data.length) % this.data.length
    //   let next = rootDom.childNodes[nextPosition]
    //   let current = rootDom.childNodes[position]
    //   let last = rootDom.childNodes[lastPosition]

    //   last.style.transition = 'none'
    //   current.style.transition = 'none'
    //   next.style.transition = 'none'

    //   last.style.transform = `translateX(${ -500 - 500 * lastPosition}px)`
    //   current.style.transform = `translateX(${-500 * position}px)`
    //   next.style.transform = `translateX(${500 - 500 * nextPosition}px)`
    //   let move = event => {
    //     current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
    //     last.style.transform =  `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
    //     next.style.transform =  `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`
    //     // console.log(event.clientX)
    //   }
    //   let up = event => {
    //     let offset = 0
    //     if (event.clientX - startX > 250) {
    //       offset = 1
    //     } else if  (event.clientX - startX < -250) {
    //       offset = -1
    //     }
    //     last.style.transition = 'none'
    //     current.style.transition = 'none'
    //     next.style.transition = 'none'

    //     current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
    //     last.style.transform =  `translateX(${offset * 500  - 500 - 500 * lastPosition}px)`
    //     next.style.transform =  `translateX(${offset * 500  + 500 - 500 * nextPosition}px)`
    //     position = (position - offset + this.data.length) % this.data.length
    //     document.removeEventListener('mousemove', move)
    //     document.removeEventListener('mouseup', up)
    //   }
    //   document.addEventListener('mousemove', move)
    //   document.addEventListener('mouseup', up)
    // })
    return root
  }
  mountTo(parent) {
    this.render().mountTo(parent)
  }
}