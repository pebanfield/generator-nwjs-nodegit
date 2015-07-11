'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
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
      'Welcome to the shining ' + chalk.red('GeneratorNwjsNodegit') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

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


      //todo - use move or delete to get rid of unnecessary dependencies
      // this.fs.delete('node_modules/nodegit');
      //delete or fs.move are causing overwrite warnings for some reason
      //SBoudrias proposed solution does not work due to issues change directory
      //context for node process
      //https://github.com/yeoman/generator/issues/392
      this.installDependencies(function(){
        this.fs.delete('node_modules/nodegit');
      });
    });





  }
});
