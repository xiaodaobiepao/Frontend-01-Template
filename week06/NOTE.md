# 每周总结可以写在这里
### 状态机
#### 有限状态机
- 每一个状态都是一个机器
    - 每个机器，我们可以做计算，存储，输出
    - 所有的这些机器接受德输入是一致的
    - 状态机德每一个机器本身没有状态，如果用函数来表示的话，它应该是纯函数（无副作用）
- 每一个机器知道下一个状态（下面是两种状态机）
    - 每个机器都有确定的下一个状态（Moore）
    - 每个机器根据输入决定下一个状态（Mealy）

#### 使用有限状态机处理字符串
```javascript
function indexOf(str) {
    for (let i = 0; i < str.length; ++i) {
        if (str[i] = 'a') return i
    }
}

// 在一个字符串中找到ab
function match(string) {
    let foundA = false
    for (let c of string) {
        if (c === 'a') {
            foundA = true
        } else {
            foundA = false
        }
        if (c === 'b' && foundA) return true
    }
    return false
}

// 在一个字符串中找到abcdef
function match(string) {
    let foundA = false
    let foundB = false
    let foundC = false
    let foundD = false
    let foundE = false
    for (let c of string) {
        if (c === 'a') {
            foundA = true
        } else if (c === 'b') {
            foundB = true
        }
        } else if (c === 'c') {
            foundC = true
        }
        } else if (c === 'd') {
            foundD = true
        }
        } else if (c === 'e') {
            foundE = true
        } else {
            foundA = false
            foundB = false
            foundC = false
            foundD = false
            foundE = false
        }
        if (c === 'b' && foundE) return true
    }
    return false
}

// 状态机的解法
function match(string) {
    let state = start
    for (let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if (c === 'a') {
        return foundA
    } else {
        return start
    }
}

function end(c) {
    return end
}

function foundA(c) {
    if (c === 'b') {
        return foundB
    } else {
        return start(c)
    }
}
function foundB(c) {
    if (c === 'c') {
        return foundC
    } else {
        return start(c)
    }
}
function foundC(c) {
    if (c === 'd') {
        return foundD
    } else {
        return start(c)
    }
}
function foundD(c) {
    if (c === 'e') {
        return foundE
    } else {
        return start(c)
    }
}
function foundE(c) {
    if (c === 'f') {
        return end
    } else {
        return start(c)
    }
}
// 作业，如何处理abcabx 这样的字符串
function match(string) {
    let state = start
    for (let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if (c === 'a') {
        return foundA
    } else {
        return start
    }
}

function end(c) {
    return end
}

function foundA(c) {
    if (c === 'b') {
        return foundB
    } else {
        return start(c)
    }
}
function foundB(c) {
    if (c === 'c') {
        return foundC
    } else {
        return start(c)
    }
}
function foundC(c) {
    if (c === 'a') {
        return foundA2
    } else {
        return start(c)
    }
}
function foundA2(c) {
    if (c === 'b') {
        return foundB2
    } else {
        return start(c)
    }
}
function foundB2(c) {
    if (c === 'c') {
        return foundC
    } else if (c === 'x') {
        return end
    } else {
        return start(c)
    }
}

// 可选作业：如何使用状态机处理完全位置的pattern（参考kmp算法）
```

### HTML

#### 第一步
- 为了方便管理，将parser放入单独文件处理
- parser处理html字符串，转换成dom

#### 第二步，创建状态机
- 使用FSM来实现对HTML的分析
- 在HTML标准中，已经规定了HTML的状态
- Toy-Brower只挑选其中一部分状态，完成一个最简版本

#### 第三步 解析html
#### 第四步，创建元素
- 在状态机中，除了状态迁移，我们还会要加入业务逻辑
- 我们在标签结束状态提交标签token

#### 第五步，处理属性
#### 第六步, 生成dom树
- 使用栈结构构建dom树
- 遇到开始标签时创建元素并入栈,遇到结束标签时出栈
- 自封闭节点视为入栈后立即岀栈
- 任何元素的父元素是它入栈前的栈顶
```html
<html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
</body>
</html>
```