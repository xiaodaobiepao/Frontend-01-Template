var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }
  collection() {
    this.log('collection')
  }
  creating() {
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), { title: 'Templating with Yeoman' })
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('lib/createElement.js')
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )
    this.fs.copyTpl(
      this.templatePath('Carousel.js'),
      this.destinationPath('src/Carousel.js')
    )
    this.fs.copyTpl(
      this.templatePath('animation.js'),
      this.destinationPath('src/animation.js')
    )
    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('src/gesture.js')
    )
    this.fs.copyTpl(
      this.templatePath('cubicBezier.js'),
      this.destinationPath('src/cubicBezier.js')
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html')
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )
    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js')
    )
    this.npmInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-transform-react-jsx',
      'mocha',
      'nyc'
    ], { 'save-dev': true })
    // this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('public/index.html'), { title: 'Templating with Yeoman' })
  }
}