# 每周总结可以写在这里

## KMP算法基本原理
KMP算法的核心思想就是source与pattern匹配的过程中，当遇到不可匹配的字符，通过某些规律，跳过不会匹配的地方。

算法最核心的部分应该是计算一个map映射，记录pattern每个字符与source不同时，该跳过几位。然后再遍历source匹配时，碰到不同的字符，直接跳过相应的位数即可。
```javascript
// 这是map的计算方法，运用了动态规划的技巧
let pattern = 'abcabx'
let map = new Array(pattern.length).fill(-1)
let k = -1 // k 就是map[j]对应的最长可匹配前缀的下标，默认为-1，表示没有
for (let j = 1; j < map.length; ++j) {
  while (k !== -1 && pattern[k+1] !== pattern[j]) {
    k = map[k]
  }
  if (pattern[k+1] === pattern[j]) {
    // 如果下一个字符pattern[k+1] === pattern[j],则map[j] == k+1
    k++
  }
  map[j] = k
}
console.log(map) // [-1, -1, -1, 0, 1, -1]
```

当算好map之后，就可以一层遍历匹配了
```javascript
// 先假设一组数据
function find() {
  const map = [-1, -1, -1, 0, 1, -1]
  let source = 'abcabcabx'
  let pattern = 'abcabx'
  let j = 0
  for (let i = 0; i < source.length; ++i) {
    while (j > 0 && source[i] !== pattern[j]) {
      // 碰到source不能匹配pattern的时候，且不是第一个字符
      j = map[j - 1] + 1 // 直到 j = 0 或者source[i] 等于 pattern[j]时
    }
    if (source[i] === pattern[j]) {
      j++
    }
    if (j === pattern.length) {
      // 匹配到结尾了
      return true
    }
  }
  return false
}
find()
```

最后

```javascript
function find(source, pattern) {
  let map = new Array(pattern.length).fill(-1)
  let k = -1 // k 就是map[j]对应的最长可匹配前缀的下标，默认为-1，表示没有
  for (let j = 1; j < map.length; ++j) {
    while (k !== -1 && pattern[k+1] !== pattern[j]) {
      k = map[k]
    }
    if (pattern[k+1] === pattern[j]) {
      // 如果下一个字符pattern[k+1] === pattern[j],则map[j] == k+1
      k++
    }
    map[j] = k
  }
  let j = 0
  for (let i = 0; i < source.length; ++i) {
    while (j > 0 && source[i] !== pattern[j]) {
      // 碰到source不能匹配pattern的时候，且不是第一个字符
      j = map[j - 1] + 1 // 直到 j = 0 或者source[i] 等于 pattern[j]时
    }
    if (source[i] === pattern[j]) {
      j++
    }
    if (j === pattern.length) {
      // 匹配到结尾了
      return true
    }
  }
  return false
}
console.log(find('abcabcabx', 'abcabx'))
```

还有带问号的kmp,将？视为万能牌即可
```javascript
function kmpFind(source, pattern) {
  let map = new Array(pattern.length).fill(-1)
  let k = -1 // k 就是map[j]对应的最长可匹配前缀的下标，默认为-1，表示没有
  for (let j = 1; j < map.length; ++j) {
    while (k !== -1 && pattern[k+1] !== pattern[j] && pattern[k+1] !== '?' && pattern[j] !== '?') {
      k = map[k]
    }
    if (pattern[k+1] === pattern[j] || pattern[k+1] === '?' || pattern[j] === '?') {
      // 如果下一个字符pattern[k+1] === pattern[j],则map[j] == k+1
      k++
    }
    map[j] = k
  }
  let j = 0
  for (let i = 0; i < source.length; ++i) {
    while (source[i] !== pattern[j] && pattern[j] !== '?' && j > 0) {
      // 有前面一部分匹配, j重置为pattern[j-1]最长可匹配前缀子串的最后一个字符(即map[j-1])的下一个位置
      j = map[j-1] + 1
    }
    if (source[i] === pattern[j] || pattern[j] === '?') {
      j++
    }
    if (j === pattern.length) {
      // 匹配到头了
      return true
    }
  }
  return false
}
```