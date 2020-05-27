const images = require('images')

module.exports = function render (viewport, element) {
  if (element.style) {
    const img = images(element.style.width, element.style.height)
    console.log(element.style)
    if (element.style['background-color']) {
      let color = element.style['background-color'] || 'rgb(0,0,0)'
      const matchRes = color.match(/rgb\((\d+),(\d+),(\d+)\)/)
      img.fill(Number(matchRes[1], matchRes[2], matchRes[3]), 1)
      viewport.draw(img, element.style.left || 0, element.style.top || 0)
    }
  }
  if (element.children) {
    for (let child of element.children) {
      render(viewport, child)
    }
  }
}