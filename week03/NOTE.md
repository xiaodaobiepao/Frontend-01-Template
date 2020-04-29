# 每周总结可以写在这里

### Expressions
- Member
  - a.b
  - a[b]
  - foo\`string\`
    - 会将string解析成foo函数的参数
  - super.b
  - super['b']
  - new.target
  - new Foo()
  -
- New
  - new Foo（new Foo() 优先级比 new Foo高）
  - new a()()
  - new new a()
- Call
  - foo()
  - super()
  - foo()['b']
  - foo().b & Right h

- Left Handside & Right Handside
  - a.b = c
  - a+b = c

- Update
  - a++
  - a--
  - --a
  - ++a

- Unary
  - delete a.b
  - void foo() (void之后任何东西都是undefined)
    - 建议再IIFE之前加上void
  - typeof a
  - +a
  - -a
  - ~a
  - !a
  - await a
- Exponental
  - `**`
    - `3 ** 2 ** 3` ==> `3 ** (2 ** 3)`
- Multiplicative
  - `* / %`
- Additive
  - `+ -`
- `Shift`
  - `<< >> >>>`
- Relationship
  - `<> <= >= instanceof in`
- equal
 - `== === != !==`
- Logical
  - `&&`
  - `||`
- Conditional
  - `? :`


- typeof缺点，不能准确识别对象的类型B

- Boxing & UnBoxing
  - ToPremitive
  - toString vs valueOf

#### 类型转换

|kong|Boolean|Number|String|Object|
|:-:|:-:|:-:|:-:|:-:|
|Null|False|0|'null'|TypeError|
|Undefined|False|NaN|'undefined'|TypeError|
|Boolean(true)|-|1|'true'|#装箱转换|
|Boolean(false)|-|0|'false'|#装箱转换|
|Numbler|0,NaN-false|#NumberToString|#装箱转换|
|String|''-false||#StringToNumber|-|#装箱转换|
|Symbol|True|TypeError|'Symbol(symbol)'|#装箱转换|
|Object|True|#拆箱转换|#拆箱转换|-|


## Javascript语句，对象

### 特殊对象（作业三）

##### String

String对象是一个外来对象，String的正整数属性访问回去字符串里查找

##### Array
Array等length 属性会根据最大的下标自动发生变化

##### Arguments
arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数, 通过索引引用。

参数也可以被设置

##### Bound Function
跟原来的函数相关联

##### Interger-Indexed
具有[[ViewedArrayBuffer]]，[[ArrayLength]]，[[ByteOffset]]和[[TypedArrayName]]的对象，跟内存块相关联，下标运算比较特殊

##### Module Namespace
模块的 namespace对象

##### Immutable Prototype

不可变原型对象，Object.prototype, 不能给它再设置原型对象了