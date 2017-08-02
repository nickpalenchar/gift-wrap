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
let chalk = require('chalk');

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
else {
  // look for a single js file in the current directory
  let jsFiles = shelljs.ls().stdout.split('\n').filter(file => /.js$/.test(file));
  console.log('the files available ', jsFiles);

  if(!jsFiles.length){
    console.log(chalk.red("ERROR: No file found!"));
    console.log(chalk.grey("No JS files were found in the root of your directory (The directory you're currently in is "),
      chalk.yellow(shelljs.pwd().stdout));
    console.log(chalk.grey("Run stocking-stuffer in the directory that contains the js file you want to use (the file should not be in a subdirectory)"));
    console.log(chalk.grey("You can also use"), chalk.yellow("--file=path/to/file.js" ), chalk.grey("to explicity specify which file should be used\n"));
    process.exit(1);

  }

  if(jsFiles.length === 1){
    // only 1 file, use as the path.
    filePath = path.join(shelljs.pwd().stdout, jsFiles[0]);
    console.log("FILEPATH ", filePath);
  }
}
  // if (!fileName) error(file not found)

  // unpack all functions in the file

console.log("FILE PATH ", filePath);
let entryFn = functionUnpacker(filePath);

entryFn();


