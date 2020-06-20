# 每周总结可以写在这里

### CSSOM
- document.styleSheets

#### Rules
- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule('p {color:pink;}', 0)
- document.styleSheets[0].removeRule(0)
- CSSStyleRUle
- CSSCharsetRule
- CSSImportRule
- CSSMediaRule
- CSSFontFaceRule
- CSSPageRule
- CSSNamespaceRule
- CSSKeyframesRule
- CSSKeyframeRule
- CSSSupportsRule

#### getComputedStyle
- window.getComputedStyle(elt, pseudoElt)
  - elt 想要获取的元素
  - pseudoElt 可选，伪元素