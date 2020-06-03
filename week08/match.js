function match(element, selector) {
  // const parents = element.parentElement
  selector = selector.toLowerCase()
  // 利用正则将串行选择器拆分成一个个单个的选择器，方便遍历与dom节点匹配
  const selectMatchs = selector.match(/[a-z\d\-\.#]+(\[[a-z_\-~|^*$'"= ]+\])*[a-z\d\-\.#:]*[\s>~+]*/g).map(m => m.trim()).reverse()
  // console.log(selectMatchs)
  // console.log('first', isSameNode(element, selectMatchs[0]))
  if (!isSameNode(element, selectMatchs[0])) {
    return false
  }
  // Todo: 遍历节点和选择器，查看是否匹配
  let node = element
  let i = 1, length = selectMatchs.length
  while (i < length) {
    let cur = selectMatchs[i]
    // console.log('curSle', cur)
    if (cur.endsWith('>')) {
      // 子孙
      node = node.parentElement
      cur = cur.slice(0, cur.length - 1).trim()
      if (!isSameNode(node, cur)) {
        return false
      }
    } else if (cur.endsWith('+')) {
      cur = cur.slice(0, cur.length - 1).trim()
      if (!element.previousElementSibling || !isSameNode(element.previousElementSibling, cur)) {
        return false
      }
    } else if (cur.endsWith('~')) {
      let prev = element.previousElementSibling
      cur = cur.slice(0, cur.length - 1).trim()
      while (prev) {
        if (isSameNode(prev, cur)) {
          break
        }
        prev = prev.previousElementSibling
      }
      if (!prev) {
        return false // 到这一步，说明兄弟节点没有匹配的
      }
      node = prev
    } else {
      let parent = node.parentElement
      while (parent) {
        // console.log('second', isSameNode(parent, cur))
        if (isSameNode(parent, cur)) {
          break
        }
        parent = parent.parentElement
      }
      // console.log('parent', parent)
      if (!parent) {
        return false
      }
      node = parent
    }
    i++
  }
  return true
}

function isSameNode (node, selectorStr) {
  // 判断当前节点是否是当前选择器
  const tagName = /[a-z]/.test(selectorStr[0]) ? selectorStr.match(/([a-z]+)/)[1] : '' // 标签必须在第一位
  const id = (selectorStr.match(/#[a-z_\d\-]+/) || [])[1] // 获取第一个匹配的id
  const classList = (selectorStr.match(/\.[a-z_\d\-_]+/g) || []).map(m => m.slice(1))
  // console.log('slstr', selectorStr)
  const attrList = (selectorStr.match(/\[[a-z_\-\d='"~|^*$ ]+\]/g) || []).map(m => m.slice(1, m.length - 1))
  const pseudoClasses = (selectorStr.match(/:[a-z\-]+/g) || []).map(m => m.slice(1))  // 不考虑伪类
  const pseudoElements = (selectorStr.match(/::[a-z\-]+/g) || []).map(m => m.slice(2)) // 也不考虑伪元素

  // console.log('tagname', tagName && node.tagName.toLowerCase() !== tagName)
  // console.log('id', id)
  // console.log('class', classList)
  // console.log('attr', attrList)
  if (tagName && node.tagName.toLowerCase() !== tagName) {
    return false
  }
  if (id && node.getAttribute('id') !== id) {
    return false
  }
  if (classList && classList.length) {
    // console.log('clist', node.classList)
    for (let i = 0; i < classList.length; ++i) {
      if (!node.classList.contains(classList[i])) {
        return false
      }
    }
  }
  if (attrList && attrList.length) {
    // 判断属性是否一致
    for (let i = 0; i < attrList.length; ++i) {
      const curAttr = attrList[i]
      // console.log(curAttr)
      const matchs = curAttr.match(/([a-z_\-\d]+)([~|]*=)*(?:"([a-z_\-\d ]*)")*/)
      const name = matchs[1]
      const symbol = matchs[2]
      const value = matchs[3]
      // console.log('symbol', symbol)
      if (name && !symbol && !node.hasAttribute(name)) {
        return false
      } else if (symbol === '=' && node.getAttribute(name) !== value) {
        return false
      } else if (symbol === '~=' && !node.getAttribute(name).split(' ').includes(value)) {
        return false
      } else if (symbol === '|=' && !node.getAttribute(name).startsWith(value) && !node.getAttribute(name).startsWith(value + '-')) {
        return false
      }
    }
  }
  return true
}