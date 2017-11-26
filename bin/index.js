#!/usr/bin/env node
let { fork, exec } = require('child_process'),
  path = require('path'),
  statSync = require('fs').statSync,
  chalk = require('chalk'),
  say = require('../helper/say'),
  confirm = require('../helper').confirm,
  shelljs = require('shelljs');

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
