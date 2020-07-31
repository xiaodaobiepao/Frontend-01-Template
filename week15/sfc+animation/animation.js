export class TimeLine {
  constructor() {
    this.animations = []
    this.startTime = 0
    this.requestId = null
    this.state = 'inited'
    this.tick = () => {
      let t =  Date.now() - this.startTime
      let animations = this.animations.filter(animation => !animation.finished)
      for (let animation of animations) {
        if (t <= animation.delay) {
          continue
        }
        let { object, property, template, start, end, duration, delay, timingFunction, startTime } = animation
        let progression = timingFunction((t - delay - startTime) / duration)
        if (t > animation.duration + animation.delay) {
          progression = 1
          animation.finished = true
        }
        let value = start + progression * (end - start)
        object[property] = template(value)
      }
      if (animations.length) {
        this.requestId = requestAnimationFrame(this.tick)
      }
    }
  }
  pause () {
    if (!this.requestId) {
      return
    }
    if (this.state !== 'playing') {
      return
    }
    this.state = 'paused'
    this.pauseTime = Date.now()
    cancelAnimationFrame(this.requestId)
    this.requestId = null
  }
  resume() {
    if (this.requestId) {
      return
    }
    if (!this.state !== 'paused') {
      return
    }
    this.state = 'playing'
    this.startTime = Date.now() - (this.pauseTime - this.startTime)
    this.tick()
  }
  restart() {
    console.log('restart')
    if (this.state === 'playing') {
      this.pause()
    }
    // this.animations = []
    this.startTime = 0
    this.requestId = null
    this.state = 'inited'
    this.pauseTime = 0
    this.start()
  }
  start() {
    if (this.state !== 'inited') {
      return
    }
    this.state = 'playing'
    this.startTime = Date.now()
    this.tick()
  }
  add(animation, startTime) {
    this.animations.push(animation)
    animation.finished = false
    if (this.state === 'playing') {
      animation.startTime = startTime !== undefined ? startTime : Date.now() - this.startTime
    } else {
      animation.startTime = startTime || 0
    }
  }
}

export class Animation {
  constructor(object, property, template, start, end, duration, delay, timingFunction) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timingFunction = timingFunction
    this.finished = false
  }
}