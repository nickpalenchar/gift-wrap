#!/usr/bin/env node

// BUILD
// the main process. Called implicitly with `giftwrap`. This is the main process that builds the script into a cli.


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
let functionUnpacker = require('../functionUnpacker');
let builder = require('../builder');
let fs = require('fs');
let path = require('path');
let chalk = require('chalk');
let prompt = require('cli-prompt');

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
  unpackFunction(filePath);

}
else {
  // look for a single js file in the current directory
  let jsFiles = shelljs.ls().stdout.split('\n').filter(file => /.js$/.test(file));

  if(!jsFiles.length){
    console.log(chalk.red("ERROR: No file found!"));
    console.log(chalk.grey("No JS files were found in the root of your directory (The directory you're currently in is "),
      chalk.yellow(shelljs.pwd().stdout));
    console.log(chalk.grey("Run giftwrap in the directory that contains the js file you want to use (the file should not be in a subdirectory)"));
    console.log(chalk.grey("You can also use"), chalk.yellow("--file=path/to/file.js" ), chalk.grey("to explicity specify which file should be used\n"));
    process.exit(1);

  }

  if(jsFiles.length === 1){
    // only 1 file, use as the path.
    filePath = path.join(shelljs.pwd().stdout, jsFiles[0]);
    unpackFunction(filePath)
  }

  else {
    // more than one file. Prompt for choice.
    multipleFilePrompt(jsFiles)
      .then( file => unpackFunction(path.join(shelljs.pwd().stdout, file)) );
  }

}

function unpackFunction(absolutePath){
  // takes the absolute path of the js file and attempts to find the source function to be used.

  if(!fs.existsSync(absolutePath)){
    console.log(chalk.red("ERROR: FILE NOT FOUND. Could not find the file located at "),
                chalk.yellow(absolutePath), chalk.red(". Make sure you're using the right path."));
    process.exit(1);
  }
  let sourceFn = functionUnpacker(absolutePath);
  console.log("HERE???");
  getCLIName()
    .then(name => builder(sourceFn, name))
    .catch(err => console.log(err));

}

function getCLIName(){
  return new Promise(resolve => {
    console.log(chalk.blue("Enter a name for your CLI.") + chalk.grey(" default: | my-cli |"));

    prompt("> ", data => {
      if(/[^\w\d-]/g.test(data)){
        console.log(chalk.red("INVALID RESPONSE: Please keep the name to letters, numbers, \"-\" and \"_\" (no spaces)"));
        return getCLIName()
      }

      resolve(data);

    })
  })
}


function multipleFilePrompt(jsFiles){

  // used in prompt for file selection. Will only accept numbered values within the range of
  return new Promise((resolve,reject)=> {
    console.log(chalk.blue("Multiple JS files detected. Select the file you want by number:"));
    let fileList = jsFiles.map((file, i) => `${i+1}) ${file}`).join('\n');
    console.log(chalk.cyan(fileList));
    prompt("> ", data => {
      data = parseInt(data);

      if(Number.isNaN(data)) {
        console.log(chalk.red("Invalid response. Please enter only a number."));
        return multipleFilePrompt(jsFiles);
      }
      console.log("FILELIST LENGTH?? ", typeof fileList);
      if(data < 1 || data > jsFiles.length) {
        console.log(chalk.red("Invalid response. Please enter a number between 1 and " + jsFiles.length));
        return multipleFilePrompt(jsFiles);
      }
      return resolve(jsFiles[data-1]);
    });
  })

}
