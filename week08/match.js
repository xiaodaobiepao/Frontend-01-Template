function match(element, selector) {
  // const parents = element.parentElement
  const selectMatchs = selector.match(/([a-z\d\.#\[\]:'"=]+[\s>~+]*)/g).map(m => m.replace(/\s/, '')).reverse()
  console.log(selectMatchs)
  // Todo: 遍历节点和选择器，查看是否匹配
}

function isSameNode (node, selectorStr) {
  // 判断当前节点是否是当前选择器
  const classList = selectorStr.match(/\.[a-z\d]+/g).map(m => m.slice(1))
  const id = selectorStr.match(/#[a-z\d]+/)[1] // 获取第一个匹配的id
  const attrList = selectorStr.match(/\[[a-z\d='"~|]+)\]/g).map(m => m.slice(1, m.length - 1))
  const pseudoClasses = selectorStr.match(/:[a-z]+/g)
  const pseudoElements = selectorStr.match(/::[a-z]+/g)
}