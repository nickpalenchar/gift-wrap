#!/usr/bin/env node
let args = process.argv.slice(2);

// concat the function.

//get params and construct arguments object
var hello = function hello(name, name2) {
  console.log("hello ", name, "\nand ", name2);
};
var fnRef = hello
;
// construct the arguments object from params

let fnArgs = [],
  argsObject = {};

let paramNames = fnRef.toString().match(/function.*\((.*)\)/)[1].replace(/\s/g,"").split(',');

paramNames.forEach(paramName => argsObject[paramName] = undefined);

// start in positional mode (plain args line up to position of the param)
// once flag (-) is given, switch to declarative

let positionalMode = true;

args.forEach((arg,i) => {

  if(/^-/.test(arg)){
    positionalMode = false;
  }
  if(positionalMode) {
    fnArgs.push(arg);
  }
  else{
    // DECLARITIVE MODE
    if(!/^-/.test(arg)){
      throw new TypeError("non-flagged argument (positional) declared after a flagged argument\n" +
        "all flags should go after positional arguments");
    }
    [paramName, paramValue] = arg.match(/-(.*)\s?=\s?(.*)/).slice(1,3);
    fnArgs[paramNames.indexOf(paramName)] = paramValue;
  }

});

//TODO: get text if a filepath is specified

//invoke the function via the ref
fnRef(...fnArgs);