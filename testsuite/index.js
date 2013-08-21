'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var TestsuiteGenerator = module.exports = function TestsuiteGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(TestsuiteGenerator, yeoman.generators.NamedBase);

TestsuiteGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [];

  // name of your testsuite
  prompts.push({
    name: 'suitename',
    message: 'What will be the name of your testsuite?',
    default: 'DalekSuite'
  });

  // should it be put into a subfolder
  prompts.push({
    type: 'confirm',
    name: 'isSubfolder',
    message: 'Would you like to put your suite into a subfolder?',
    default: false
  }, {
    when: function(props) { return props.isSubfolder },
      name: 'subfolder',
      message: 'Please tell me the name of your subfolder'
  });

  // javascript or coffeescript
  prompts.push({
    type: 'confirm',
    name: 'isCoffee',
    message: 'Would you like to write your tests in coffeescript?',
    default: false
  });

  // should I add a basic test for you
  prompts.push({
    type: 'confirm',
    name: 'isCoffee',
    message: 'Would you like me to add a basic test for you?',
    default: false
  });

  this.prompt(prompts, function (props) {
    this.suitename = props.suitename;
    this.isSubfolder = props.isSubfolder;
    this.subfolder = props.subfolder;
    this.isCoffee = props.isCoffee;

    cb();
  }.bind(this));
};
