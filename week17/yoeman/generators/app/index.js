var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    // this.option('babel')
    // this.helperMethod = function () {
    //   console.log('wont be called automatically')
    // }
  }
  // async prompting() {
  // }
  // installingLodash() {
  //   this.npm
  //   this.npmInstall(['lodash'], {'save-dev': true})
  // }
  // writing() {
  //   const pkgJson = {
  //     devDependencies: {
  //       eslint: '^3.15.0'
  //     },
  //     dependencies: {
  //       react: '^16.2.0'
  //     }
  //   }
  //   this.fs.extendJSON(this.destinationPath('package.json'))
  // }
  // install() {
  //   this.npmInstall()
  // }
  writing() {
    this.fs.copyTpl(
      this.templatePath('template/index.html'),
      this.destinationPath('public/index.html'),
      {
        title: 'Templating with Yeoman'
      }
    )
  }
}