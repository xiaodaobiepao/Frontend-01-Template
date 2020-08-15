const compiler = require('@vue/compiler-sfc')

console.log(compiler.compileTemplate({
  filename: 'example.vue',
  source: '<div>Hello world!</div>'
}))