#!/usr/bin/env node

/**
 * @flag --file - set = to path where the file is
 */

let args = {};
process.argv.slice(2).forEach((arg) => {
  if(/[\w-]+=\w+/.test(arg)) {
    let [key, value] = arg.split("=");
    return args[key] = value;
  }
  return args[arg] = true;
});

let shelljs = require('shelljs');
let functionUnpacker = require('./functionUnpacker');
let path = require('path');

////// A) Source File //////
let filePath;
// A1 - user specified which file should be used
console.log("WD ", shelljs.pwd().stdout);
if(args["--file"]){
  let fileArg = args["--file"];
  if(/^[~\/]/.test(fileArg)){
    // absolute path constructing
    filePath = fileArg;
  }
  else {
    // relative path constructing
    filePath = path.join(shelljs.pwd().stdout, fileArg);
  }

}
  // if (!fileName) error(file not found)

  // unpack all functions in the file

console.log("FILE PATH ", filePath);
let entryFn = functionUnpacker(filePath);

entryFn();


