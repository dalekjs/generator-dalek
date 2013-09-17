/**
 * A generator for Yeoman.
 * 
 * ## Getting started
 * - Make sure you have [yo](https://github.com/yeoman/yo) installed:
 *     `npm install -g yo`
 * - Install the generator: `npm install -g generator-dalekjs`
 * - Run: `yo dalekjs`
 * 
 * @part Yeoman
 * @api
 */

'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');


var DalekjsGenerator = module.exports = function DalekjsGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'], bower: false });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DalekjsGenerator, yeoman.generators.Base);

DalekjsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [];

  // Test setup
  // ----------

  prompts.push({
    name: 'testfolder',
    message: 'In which folder should I generate your DalekJS tests?',
    default: 'test'
  });

  prompts.push({
    type: 'confirm',
    name: 'grunt',
    message: 'Would you like to run your tests with the help of grunt?',
    default: true
  });

  // Browser plugins
  // ---------------

  prompts.push({
    type: 'confirm',
    name: 'browser',
    message: 'Would you like to run other browsers than PhantomJS?',
    default: false
  });

  var browsers = {
    type: 'checkbox',
    name: 'browsers',
    message: 'Please select a browser',
    choices: [],
    when: function (props) {
      return props.browser;
    }
  };

  browsers.choices.push({
    value: 'chrome',
    name: 'Google Chrome',
    checked: false
  });

  browsers.choices.push({
    value: 'firefox',
    name: 'Mozilla Firefox & Firefox OS',
    checked: false
  });

  if (process.platform === 'darwin') {
    browsers.choices.push({
      value: 'ios',
      name: 'Safari on iOS',
      checked: false
    });
  }

  if (process.platform === 'win32') {
    browsers.choices.push({
      value: 'ie',
      name: 'Microsoft Internet Explorer',
      checked: false
    });
  }

  prompts.push(browsers);

  // Reporter plugins
  // ----------------

  prompts.push({
    type: 'confirm',
    name: 'reporter',
    message: 'Would you like to install some additional reporters (HTML, jUnitXML, etc.)?',
    default: false
  });

  prompts.push({
    type: 'checkbox',
    name: 'reporters',
    message: 'What more would you like?',
    choices: [{
      name: 'HTML',
      value: 'reporterHtml',
      checked: true
    }, {
      name: 'jUnit',
      value: 'reporterjUnit',
      checked: false
    }],
    when: function (props) {
      return props.reporter;
    }
  });

  // Suite scaffolding
  // -----------------

  // should I add a basic test for you
  prompts.push({
    type: 'confirm',
    name: 'generateDummySuite',
    message: 'Would you like me to add a basic test for you?',
    default: true
  });

  // testsuite name
  prompts.push({
    name: 'suitname',
    message: 'What is the name of your first testsuite?',
    default: 'First test',
    when: function (props) {
      return props.generateDummySuite;
    }
  });

  // javascript or coffeescript
  prompts.push({
    type: 'confirm',
    name: 'isCoffee',
    message: 'Would you like to write your tests in CoffeeScript?',
    default: false,
    when: function (props) {
      return props.generateDummySuite;
    }
  });

  this.prompt(prompts, function (props) {
    this.testfolder = props.testfolder;
    this.grunt = props.grunt;
    this.browser = props.browser;
    this.browsers = props.browsers;
    this.reporter = props.reporter;
    this.reporters = props.reporters;
    this.generateDummySuite = props.generateDummySuite;
    this.isCoffee = props.isCoffee;

    cb();
  }.bind(this));
};

DalekjsGenerator.prototype.app = function app() {
  // generate the folder where the dalekjs tests should be put
  //this.mkdir(this.testfolder);

  // check if a package json exists, if not, copy over a basic one
  if (!fs.existsSync(process.cwd() + '/package.json')) {
    //this.copy('_package.json', 'package.json');
  } else {
    // modify package.json
  }

  // check if we should add grunt to the mix
  if (this.grunt) {
    // check if a package json exists, if not, copy over a basic one
    if (!fs.existsSync(process.cwd() + '/Gruntfile.js')) {
      //this.copy('_Gruntfile.json', 'Gruntfile.js');
    } else {
      // Give hints on how to add dalek to the gruntfile
    }
  }
  // generate a dummy testsuite & testcase
  if (this.generateDummySuite) {
    //this.copy('_dummyTest.js', this.testfolder + '/' + this.testname + '.js');
  }

};
