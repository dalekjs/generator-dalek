'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');


var DalekjsGenerator = module.exports = function DalekjsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DalekjsGenerator, yeoman.generators.Base);

DalekjsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [];

  prompts.push({
    name: 'testfolder',
    message: 'In which folder should I generate your DalekJS tests?'
  });

  this.prompt(prompts, function (props) {
    this.testfolder = props.testfolder;

    cb();
  }.bind(this));
};

DalekjsGenerator.prototype.app = function app() {
  // generate the folder where the dalekjs tests should be put
  this.mkdir(this.testfolder);

  // check if a package json exists, if not, copy over a basic one
  if (!fs.existsSync(process.cwd() + '/package.json')) {
    this.copy('_package.json', 'package.json');
  }

};
