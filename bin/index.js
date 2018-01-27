#!/usr/bin/env node
let { fork, exec } = require('child_process'),
  path = require('path'),
  statSync = require('fs').statSync,
  chalk = require('chalk'),
  say = require('../helper/say'),
  confirm = require('../helper').confirm,
  shelljs = require('shelljs');

let argv = require('argvee')();


// PARSE OPTIONS
// matches all -`x` options into `__flag`, and long flags into a key of their own name
// (eg `--foo` will be on OPTIONS.foo

(commandStr.match(/--(\S+)/g) || []).forEach(option => {
  option = option.split("=");
  global.OPTIONS[option[0].slice(2)] = option[1];
});

console.log('the options ', OPTIONS );
// see if there is a command
let command, args;
if (/^-/.test(process.argv[2]) || !process.argv[2]) {
  command = 'build';
  args = process.argv.slice(2);
}
else {
  command = process.argv[2];
  args = process.argv.slice(3);
}

// DEPENDENCY CHECK. If the directory is not in /usr/local/giftwrap, we defer to init
if(!shelljs.ls('/usr/local').includes('giftwrap')){
  say(chalk.blue('Welcome to giftwrap!'));
  command = 'init';
  args = [];
}
fork(path.join(__dirname, command), args);
