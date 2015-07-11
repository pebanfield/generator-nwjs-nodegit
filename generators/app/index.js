'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  installDependencies: function() {
    this.npmInstall(['node-webkit-builder'], { 'saveDev': true });
    this.npmInstall(['gulp'], { 'saveDev': true });
    this.npmInstall(['gulp-util'], { 'saveDev': true });
    this.npmInstall(['bluebird'], { 'saveDev': false });
    this.npmInstall(['nodegit'], { 'saveDev': false });

  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Nodegit for nw.js Install'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'generateOption',
      message: 'Generate a nodegit for nw.js template?.',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('Gulpfile.js'),
        this.destinationPath('Gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copy(
        this.templatePath('nwapp'),
        this.destinationPath('nwapp')
      );

    }
  },

  install: function () {

    //work around for node subdirectory
    //https://github.com/yeoman/generator/issues/392
    this.on('end', function () {
      this.fs.copy(
        'node_modules/nodegit',
        this.destinationPath('nwapp/node_modules/nodegit')
      );
      this.fs.copy(
        'node_modules/gulp',
        this.destinationPath('nwapp/node_modules/gulp')
      );
      this.fs.copy(
        'node_modules/bluebird',
        this.destinationPath('nwapp/node_modules/bluebird')
      );

      this.installDependencies(function(){
        this.fs.delete('node_modules/nodegit');
      });
    });





  }
});
