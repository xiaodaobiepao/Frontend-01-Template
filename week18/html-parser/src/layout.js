module.exports = function layout (element) {
  // console.log(element)
  if (!element.computedStyle || JSON.stringify(element.computedStyle) === '{}') {
    return
  }
  let style = getStyle(element)
  if (style.display !== 'flex') {
    return // 只做flex布局，掐摒弃掉
  }
  const items = element.children.filter(e => e.type === 'element')
  items.sort((a, b) => {
    return (a.order || 0) - (b.order || 0)
  })
  ;['width', 'height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null
    }
  })

  // 初始化默认值
  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row'
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch'
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start'
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap'
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch'
  }

  let mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase;
  if (style.flexDirection === 'row') {
    mainSize = 'width' // 尺寸
    mainStart = 'left' // 起始方向
    mainEnd = 'right' // 结束方向
    mainSign = +1 // 排布方向
    mainBase = 0 // 起点位置

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  } else if (style.flexDirection === 'row-reverse') {
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainSign = -1
    mainBase = style.width

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  } else if (style.flexDirection === 'column') {
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainSize = +1
    mainBase = 0

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  } else if (style.flexDirection === 'column-reverse') {
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainSize = -1
    mainBase = style.height

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }

  if (style.flexWrap === 'wrap-reverse') {
    let temp = crossStart
    crossStart = crossEnd
    crossEnd = temp
    crossSign = -1
  } else {
    crossBase = 0
    crossSign = 1
  }

  let isAutoMainSize = false
  if (!style[mainSize]) {
    style[mainSize] = 0
    for (let i = 0; i < items.length; ++i) {
      let item = items[i]
      let itemStyle = getStyle(item)
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
        style[mainSize] = style[mainSize] + itemStyle[mainSize]
      }
    }
    isAutoMainSize = true
  }

  // 将元素加入行
  let flexLine = [] // 单行
  let flexLines = [flexLine] // 所有行
  let mainSpace = style[mainSize] // 主轴空间
  let crossSpace = 0 // 交叉轴空间

  for (let i = 0; i < items.length; ++i) {
    let item = items[i]
    let itemStyle = getStyle(item)
    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0
    }

    if (itemStyle.flex) {
      // flex属性表示可伸缩，则一定可以放入行中
      flexLine.push(item)
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize]
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        // 如果子元素有交叉轴的单位
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      flexLine.push(item)
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        // 如果单个宽度大于容器宽度，则缩小单个宽度为容器宽度
        itemStyle[mainSize] = style[mainSize]
      }
      if (mainSpace < itemStyle[mainSize]) {
        // 如果剩余空间小于单个空间
        flexLine.mainSpace = mainSpace
        flexLine.crossSpace = crossSpace
        // 原来的flexLine还在flexLines里面
        flexLine = [item]
        flexLines.push(flexLines)
        mainSpace = style[mainSize]
        crossSpace = 0
      } else {
        flexLines.push(item)
      }
      if (itemStyle[crossSign] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      mainSpace -= itemStyle[mainSize]
    }
  }
  flexLine.mainSpace = mainSpace

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== (void 0)) ? style[crossSize] : crossSpace
  } else {
    flexLine.crossSpace = crossSpace
  }

  if (mainSpace < 0) {
    // 单行的mainSpace 可能小于0
    let scale = style[mainSize] / (style[mainSize] - mainSpace)
    let currentMain = mainBase
    for (let i = 0; i < items.length; ++i) {
      let item = items[i]
      let itemStyle = getStyle(item)
      if (itemStyle.flex) {
        // 自适应
        itemStyle[mainSize]  = 0
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale
      itemStyle[mainStart] = currentMain
      itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * mainSign

      currentMain = itemStyle[mainEnd]
    }
  } else {
    // 多行的mainSpace一定大于0
    flexLines.forEach(items => {
      let mainSpace = items.mainSpace
      let flexTotal = 0 // flex总值
      for (let i = 0; i < items.length; ++i) {
        let item = items[i]
        let itemStyle = getStyle(item)
        if (itemStyle !== null && itemStyle.flex !== (void 0)) {
          flexTotal += itemStyle.flex
          continue
        }
      }
      if (flexTotal > 0) {
        // 这是有可伸缩盒子，有可伸缩盒子就意味着没有剩余空间
        let currentMain = mainBase
        for (let i = 0; i < items.length; ++i) {
          let item = items[i]
          let itemStyle = getStyle(item)
          if (itemStyle.flex) {
            // 当前盒子是可伸缩盒子，计算当前盒子应该占的宽度
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
          }
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd]
        }
      } else {
        let currentMain
        let step
        // 没有伸缩盒子，根据对齐方向找起始
        if (style.justifyContent === 'flex-start') {
          // 从左至右
          currentMain = mainBase
          step = 0
        }
        if (style.justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSign + mainBase
          step = 0
        }
        if (style.justifyContent === 'center') {
          currentMain = mainSpace / 2 * mainSign + mainBase
          step = 0
        }
        if (style.justifyContent === 'space-between') {
          step = mainSpace / (items.length - 1) * mainSign
          currentMain = mainBase
        }
        if (style.justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign
          currentMain = step / 2 + mainBase
        }
        for (let i = 0; i < items.length; ++i) {
          let itemStyle = getStyle(items[i])
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd] + step
        }
      }

      // 计算 交叉轴
    })
  }
  // let crossSpace
  if (!style[crossSize]) { // 容器没有设置高度
    crossSpace = 0
    style[crossSize] = 0
    for (let i = 0; i < flexLines.length; ++i) {
      style[crossSize] = style[crossSize] + flexLines[i].crossSpace
    }
  } else {
    crossSpace = style[crossSize]
    for (let i = 0; i < flexLines.length; ++i) {
      crossSpace -= flexLines[i].crossSpace
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize]
  } else {
    crossBase = 0
  }

  let lineSize = style[crossSize] / flexLines.length
  let step
  if (style.alignContent === 'flex-start') {
    crossBase += 0
    step = 0
  }
  if (style.alignContent === 'flex-end') {
    crossBase += crossSpace
    step = 0
  }
  if (style.alignContent === 'center') {
    crossBase += (crossSpace / 2)
    step = 0
  }
  if (style.alignContent === 'space-between') {
    step = crossSpace / (flexLines.length - 1)
    crossBase += 0
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / flexLines.length
    crossBase += crossSign * step / 2
  }
  if (style.alignContent === 'stretch') {
    crossBase += 0
    step = 0
  }
  flexLines.forEach(items => {
    let lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace
    for (let i = 0; i < items.length; ++i) {
      let item = itmes[i]
      let itemStyle = getStyle(item)
      let align = itemStyle.alignSelf || style.alignItems
      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0
      }
      if (align === 'flex-start') {
         itemStyle[crossStart] = crossBase
         itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossSize] * crossSign
      }
      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize
         itemStyle[crossStart] = itemStyle[crossEnd] - itemStyle[crossSize] * crossSign
      }
      if (align === 'center') {
         itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2
         itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossSize] * crossSign
      }
      // if (align === 'stretch') {
      //   itemStyle[crossStart] = crossBase
      //   itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) ? lineCrossSize : itemStyle)
      //   itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      // }
      crossBase += crossSign * (lineCrossSize + step)
      // if (align === 'space-between') {
      //    itemStyle[crossStart] = crossBase
      //    itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossSize]
      // }
      // if (align === 'space-around') {
      //    itemStyle[crossStart] = crossBase
      //    itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossSize]
      // }
    }
  })
}

function getStyle (element) {
  if (!element.style) {
    element.style = {}
  }
  !element.computedStyle && (element.computedStyle = {})
  // console.log(JSON.stringify(element.computedStyle, null, '   '))
  // const style = {}
  for (let key in element.computedStyle) {
    // let p = element.computedStyle.value 这是什么意思
    element.style[key] = element.computedStyle[key].value

    if (element.style[key].toString().match(/px$/)) {
      element.style[key] = parseInt(element.style[key])
    }
    if (element.style[key].toString().match(/^[0-9]\.]+$/)) {
      element.style[key] = parseInt(element.style[key])
    }
    // style[key] = element.computedStyle[key].value
  }
  return element.style
}