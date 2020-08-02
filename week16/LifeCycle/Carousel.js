import { TimeLine, Animation } from './animation'
import { ease } from './cubicBezier'

export class Carousel {
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
    let children = this.data.map(url => {
      let element = <img src={url} />
      element.addEventListener('dragstart', event => event.preventDefault())
      return element
    })
    let root = <div class="carousel">
      {children}
    </div>

    let position = 0
    let timeline = new TimeLine
    let rootDom = root.root
    timeline.start()
    let nextPic = () => {
      console.log(position)
      let nextPosition = (position + 1) % this.data.length
      let current = rootDom.childNodes[position]
      let next = rootDom.childNodes[nextPosition]
      let currentAnimation = new Animation(current.style, 'transform', (v => `translateX(${v}%)`), -100 * position, - 100 - 100 * position, 500, 0, ease)
      let nextAnimation = new Animation(next.style, 'transform', (v => `translateX(${v}%)`), 100 - 100 * nextPosition, -100 * nextPosition, 500, 0, ease)
      timeline.add(currentAnimation)
      timeline.add(nextAnimation)
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
      setTimeout(nextPic, 3000)
    }
    setTimeout(nextPic, 3000)
    rootDom.addEventListener('mousedown', event  => {
      let startX = event.clientX, startY = event.clientY
      let nextPosition = (position + 1) % this.data.length
      let lastPosition = (position - 1 + this.data.length) % this.data.length
      let next = root.childNodes[nextPosition]
      let current = root.childNodes[position]
      let last = root.childNodes[lastPosition]

      last.style.transition = 'none'
      current.style.transition = 'none'
      next.style.transition = 'none'

      last.style.transform = `translateX(${ -500 - 500 * lastPosition}px)`
      current.style.transform = `translateX(${-500 * position}px)`
      next.style.transform = `translateX(${500 - 500 * nextPosition}px)`
      let move = event => {
        current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
        last.style.transform =  `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
        next.style.transform =  `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`
        // console.log(event.clientX)
      }
      let up = event => {
        let offset = 0
        if (event.clientX - startX > 250) {
          offset = 1
        } else if  (event.clientX - startX < -250) {
          offset = -1
        }
        last.style.transition = 'none'
        current.style.transition = 'none'
        next.style.transition = 'none'

        current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
        last.style.transform =  `translateX(${offset * 500  - 500 - 500 * lastPosition}px)`
        next.style.transform =  `translateX(${offset * 500  + 500 - 500 * nextPosition}px)`
        position = (position - offset + this.data.length) % this.data.length
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
    return root
  }
  mountTo(parent) {
    this.render().mountTo(parent)
  }
}