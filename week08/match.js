function match(element, selector) {
  // const parents = element.parentElement
  const selectMatchs = selector.match(/([a-z\d\-\.#\[\]:'"=]+[\s>~+]*)/g).map(m => m.replace(/\s/, '')).reverse()
  console.log(selectMatchs)
  console.log('first', isSameNode(element, selectMatchs[0]))
  if (!isSameNode(element, selectMatchs[0])) {
    return false
  }
  // Todo: 遍历节点和选择器，查看是否匹配
  let node = element
  let i = 1, length = selectMatchs.length - 1
  while (i < length) {
    const cur = selectMatchs[i]
    if (cur.endsWith('>')) {
      // 子孙
      node = node.parentElement
      if (!isSameNode(node, cur)) {
        return false
      }
    } else if (cur.endsWith('+')) {
      if (!element.previousElementSibling || !isSameNode(element.previousElementSibling, cur)) {
        return false
      }
    } else if (cur.endsWith('~')) {
      let prev = element.previousElementSibling
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
        console.log('second', isSameNode(parent, cur))
        if (isSameNode(parent, cur)) {
          break
        }
        parent = parent.parentElement
      }
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
  const id = (selectorStr.match(/#[a-z_\d\-]+/) || [])[1] // 获取第一个匹配的id
  const classList = (selectorStr.match(/\.[a-z_\d\-_]+/g) || []).map(m => m.slice(1))
  const attrList = (selectorStr.match(/\[[a-z_\-\d='"~|]+\]/g) || []).map(m => m.slice(1, m.length - 1))
  const pseudoClasses = (selectorStr.match(/:[a-z\-]+/g) || []).map(m => m.slice(1))
  const pseudoElements = (selectorStr.match(/::[a-z\-]+/g) || []).map(m => m.slice(2))

  if (id && node.getAttribute('id') !== id) {
    return false
  }
  if (classList && classList.length) {
    for (let i = 0; i < classList.length; ++i) {
      if (!node.classList.contains(classList[i])) {
        return false
      }
    }
  }
  if (attrList && attrList.length) {
    // 判断属性是否一致
  }
  return true
}