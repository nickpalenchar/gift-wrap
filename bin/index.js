#!/usr/bin/env node
let fork = require('child_process').fork,
  path = require('path');

// see if there is a command
console.log(/^-/.test(process.argv[2]));
console.log(!process.argv[2]);
let command, args;
if (/^-/.test(process.argv[2]) || !process.argv[2]) {
  console.log('got hereeee ');
  command = 'build';
  args = process.argv.slice(2);
}
else {
  console.log('got here ???');
  command = process.argv[2];
  args = process.argv.slice(3);
}
fork(path.join(__dirname, command), args);
