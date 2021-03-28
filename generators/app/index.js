const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'projectname',
        message: 'Your project name',
        default: this.appname,
      },
    ]).then(answers => {
      this.answers = answers
    })
  }
  writing() {
    const templates = [
      'babel.config.js',
      'package.json',
      'webpack.dev.js',
      'webpack.prod.js',
      'webpack.common.js',
      'config/dev.env.js',
      'config/prod.env.js',
      'public/favicon.ico',
      'public/poi-icon.png',
      'src/assets/logo.png',
      'src/assets/movie.ogm',
      'src/components/HelloWorld.vue',
      'src/App.vue',
      'src/index.html',
      'src/main.js',
      'src/style.less',
    ]

    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}
