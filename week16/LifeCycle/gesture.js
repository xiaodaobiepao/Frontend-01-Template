enableGesture(document.body)
document.body.addEventListener('tap', event => {
  console.log('chufatapp!!!')
})
document.body.addEventListener('panend', event => {
  console.log('chufatpanend!!!', event)
})
export function enableGesture(element) {
  let contexts = {}
  let MOUSE_SYMBOL = Symbol('mouse')
  // let TAUCH_
  if (document.ontouchstart !== null) {
    element.addEventListener('mousedown', event => {
      contexts[MOUSE_SYMBOL] = Object.create(null)
      start(event, contexts[MOUSE_SYMBOL])
      let mousemove = event => {
        move(event, contexts[MOUSE_SYMBOL])
      }
      let mouseend = event => {
        end(event, contexts[MOUSE_SYMBOL])
        element.removeEventListener('mousemove', mousemove)
        element.removeEventListener('mouseup', mouseend)
      }
      element.addEventListener('mousemove', mousemove)
      element.addEventListener('mouseup', mouseend)
    })
  }
  
  element.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start(touch, contexts[touch.identifier])
    }
  })
  element.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier])
    }
  })
  element.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })
  element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })
  
  // tap
  // pan- start move end
  // flick
  // press- start end
  
  let start = (point, context) => {
    element.dispatchEvent(new CustomEvent('start', {
      detail: {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY
      }
    }))
    context.startX = point.clientX
    context.startY = point.clientY
    context.moves = []
    context.isTap = true
    context.isPan = false
    context.isPress = false
    context.timeoutHandlr = setTimeout(() => {
      if (context.isPan) {
        return
      }
      context.isTap = false
      context.isPan = false
      context.isPress = true
      console.log('presstart')
      element.dispatchEvent(new CustomEvent('pressstart', {}))
    }, 500)
    // console.log('start', point.clientX, point.clientY)
  }
  
  let move = (point, context) => {
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent('presscancel', {}))
        console.log('presscancel')
      }
      context.isTap = false
      context.isPan = true
      context.isPress = false
      element.dispatchEvent(new CustomEvent('panstart', {}))
      console.log('panstart')
    }
    if (context.isPan) {
      context.moves.push({
        dx, dy,
        t: Date.now()
      })
      context.moves = context.moves.filter(record => Date.now() - record.t < 300)
      element.dispatchEvent(new CustomEvent('panmove', {}))
      console.log('pan')
    }
  }
  
  let end = (point, context) => {
    // console.log('end', point.clientX, point.clientY)
    if (context.isPan) {
      let dx = point.clientX - context.startX
      let dy = point.clientY - context.startY
      let record0 = context.moves[0]
      let speed = Math.sqrt((record0.dx - dx) ** 2 + (record0.dy - dy) ** 2) / (Date.now() - record0.t)
      let isFlick = speed > 2
      if (isFlick) {
        console.log('flick')
        element.dispatchEvent(new CustomEvent('flick', {
          detail: {
            startX: point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed
          }
        }))
      }
      console.log('panend')
      element.dispatchEvent(new CustomEvent('panend', {
        detail: {
          startX: point.clientX,
          startY: point.clientY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed,
          isFlick
        }
      }))
    }
    if (context.isTap) {
      console.log('tap')
      element.dispatchEvent(new CustomEvent('tap', {}))
    }
    if (context.isPress) {
      console.log('pressend')
      element.dispatchEvent(new CustomEvent('pressend', {}))
    }
    clearTimeout(context.timeoutHandlr)
  }
  
  let cancel = (point, context) => {
    console.log('cancel')
    element.dispatchEvent(new CustomEvent('cancel', {}))
    clearTimeout(context.timeoutHandlr)
    // console.log('cencel', point.clientX, point.clientY)
  }
}