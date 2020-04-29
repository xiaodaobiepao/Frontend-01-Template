### StringToNumber

```javascript
function stringToNumber (string, x) {
  if (typeof string !== 'string') {
    return NaN
  }
  if (x && (typeof x !== 'number' || /\./.test(x) || x < 2 || x > 36)) {
    // x 不符合要求
    return NaN
  }
  string = string.trim()
  var regexp = x === 10 ? /(-?)(0?)([\d,]*)(\.?)(\d*)(e?)([+-]?)(\d*)/ : /(-?)(0?[Xxob]?)([\da-fA-F]+)(\.?)([\da-fA-F]*)/
  var matchRes = string.match(regexp)
  var symbol = matchRes[1]
  var radix = matchRes[2]
  var integer = matchRes[3].replace(',', '')
  // var decimalPoint = matchRes[4]
  var decimal = matchRes[5]
  var e = matchRes[6]
  var eSymbol = matchRes[7]
  var exponent = matchRes[8]
  if (radix && !x) {
    // 如果没有传进制，又有匹配结果，则根据匹配出的进制转换
    if (radix.toLowerCase() === '0x') {
      x = 16
    } else if (radix.toLowerCase() === '0o') {
      x = 8
    } else if (radix.toLowerCase() === '0b') {
      x = 2
    } else {
      x = 10
    }
  }
  x = x || 10
  var CODE_OF_ZERO = '0'.charCodeAt(0)
  var CODE_OF_A = 'A'.charCodeAt(0)
  var CODE_OF_Z = 'Z'.charCodeAt(0)
  var num
  var charCode
  var integerNum = 0
  for (let i = 0; i < integer.length; ++i) {
    charCode = integer[i].toUpperCase().charCodeAt(0)
    if (x <= 36 && x >= 11) {
      // 大于10进制
      if (charCode >= CODE_OF_A && charCode <= CODE_OF_Z) {
        num = charCode - 55 // 'A'对应的数字是10
      } else {
        num = charCode - CODE_OF_ZERO
      }
    } else {
      num = charCode - CODE_OF_ZERO
    }
    if (num >= x) {
      // 某一位超出当前进制了
      return NaN
    }
    integerNum = integerNum * x
    integerNum += num
  }
  var decimalNum = 0
  let i = decimal.length
  while (i--) {
    charCode = decimal[i].toUpperCase().charCodeAt(0)
    if (x <= 36 && x >= 11) {
      // 大于10进制
      if (charCode >= CODE_OF_A && charCode <= CODE_OF_Z) {
        num = charCode - 55 // 'A'对应的数字是10
      } else {
        num = charCode - CODE_OF_ZERO
      }
    } else {
      num = charCode - CODE_OF_ZERO
    }
    if (num >= x) {
      // 某一位超出当前进制了
      return NaN
    }
    decimalNum = decimalNum / x
    decimalNum = decimalNum + num / x
  }
  var result = integerNum + decimalNum
  if (x === 10 && e && exponent) {
    // 10 进制且是科学计数法
    var eRes
    if (eSymbol === '-') {
      exponent = -exponent
    }
    result = result * (10 ** exponent)
  }
  if (symbol === '-') {
    // 符号位
    result = -result
  }
  return result
}

// 测试用例
void (function () {
  console.log(stringToNumber("0xF", 16)); // 15
  console.log(stringToNumber("F", 16)); // 15
  console.log(stringToNumber("17", 8)); // 15
  console.log(stringToNumber("015", 10));   // console.log(stringToNumber(015, 10); 返回 15
  console.log(stringToNumber('15.99', 10)); // 15.99
  console.log(stringToNumber("15,123", 10)); // 15123 将逗号去掉了
  console.log(stringToNumber("FXX123", 16)); // 15
  console.log(stringToNumber("1111", 2)); // 15
  console.log(stringToNumber("15e2", 10)); // 1500
  console.log(stringToNumber("15px", 10)); // 15 舍弃掉了'px'
  console.log(stringToNumber("12", 13)); // 15
  // 以下例子均返回 NaN:

  console.log(stringToNumber("Hello", 8)); // 根本就不是数值 NaN
  console.log(stringToNumber("546", 2));   // 除了“0、1”外，其它数字都不是有效二进制数字
  // 以下例子均返回 -15：

  console.log(stringToNumber("-F", 16)); // -15
  console.log(stringToNumber("-0F", 16)); // -15
  console.log(stringToNumber("-0XF", 16)); // -15
  console.log(stringToNumber('-15.1', 10)); // -15.1
  console.log(stringToNumber(" -17", 8)); // -15
  console.log(stringToNumber(" -15", 10));
  console.log(stringToNumber("-1111", 2)); // -15
  console.log(stringToNumber("-15e1", 10)); // -150
  console.log(stringToNumber("-12", 13)); // -15


  console.log(stringToNumber(0.00000000000434, 10)); // 4.340000000000001e-12
  }())
```

### NumberToString
```javascript
function numberToString (number, x) {
  if (typeof number !== 'number' && typeof number !== 'string') {
    throw new Error(`${number} should be number`)
  }
  if (Number.isNaN(number)) {
    return 'NaN'
  }
  if (number === 0) {
    return '0'
  }
  x = x || 10
  var symbol = number < 0 ? '-' : '' // 基于+0, -0已被排除的情况
  if (Math.abs(number) === Infinity) {
    string += Math.abs(number)
    return string
  }
  number = Math.abs(number)
  var integer = Math.floor(number)
  var fraction = number - integer
  var string = ''
  while (integer > 0) {
    let char = integer % x
    if (char > 9) {
      char = String.fromCharCode(char + 55)
    }
    string = char + string
    integer = Math.floor(integer / x)
  }
  if (fraction) {
    string += '.'
  }
  while (Math.floor(fraction) < fraction) {
    fraction = fraction * x
    string = string + Math.floor(fraction % 10)
  }
  string = symbol + string
  return string
}

// 测试
void (function () {
  console.log(numberToString(29822)) // "29822"
  console.log(numberToString(0xaf)) // "175"
  console.log(numberToString(0xaf, 2)) // "10101111"
  console.log(numberToString(0xaf, 16)) // "AF"
  console.log(numberToString(-0xaf, 16)) // "-AF"
}())
```

### 找出特殊对象
见学习总结