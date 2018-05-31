; // empty block to ensure final statement in user program doesn't collide with first statement here

// construct the arguments object from params
let path = require('path');
let {existsSync, readFileSync } = require('fs');
let {execSync} = require('child_process');

let fnArgs = [],
  argsObject = {};

let paramNames = (fnRef.toString().match(/function.*\((.*)\)/) || ['',''])[1].replace(/\s/g, "").split(',');

paramNames.forEach(paramName => argsObject[paramName] = undefined);

// start in positional mode (plain args line up to position of the param)
// once flag (-) is given, switch to declarative

let positionalMode = true;

args.forEach((arg, i) => {

  if (/^-/.test(arg)) {
    positionalMode = false;
  }
  if (positionalMode) {
    fnArgs.push(arg);
  }
  else {
    // DECLARITIVE MODE
    if (!/^-/.test(arg)) {
      throw new TypeError("non-flagged argument (positional) declared after a flagged argument\n" +
        "all flags should go after positional arguments");
    }
    [paramName, paramValue] = arg.match(/-(.*)\s?=\s?(.*)/).slice(1, 3);
    fnArgs[paramNames.indexOf(paramName)] = paramValue;
  }

});

fnArgs = fnArgs.map(name => {
  let wd = execSync('pwd').toString('utf8').replace('\n', '');
  // design choice. If it starts with a `~`, `/`, `.`, or `..`, it will only be considered as a file path.
  // if the file does not exist, it will error. EVEN if it expected a string that began with one of these
  // characters.

  // CASE 1: ABSOLUTE PATH
  // assume path exists, if not, throw error.
  if (/^[\/~]/.test(name)) {
    if (existsSync(name)) {
      return readFileSync(name, 'utf8').toString();
    }
    console.log("Error: Cannot find file");
    process.exit(1);
  }
  // CASE 2: POTENTIAL RELATIVE PATH
  if (/^\.{1,2}\.+/.test(name)) {
    console.log("><U>><U><U<></U>", name);
    // @TODO still need to check and make sure.
    let pathToFile = path.join(wd, name);

    if (existsSync(pathToFile)) {
      return readFileSync(pathToFile).toString();
    }
    console.log("Error: Cannot find file");
    process.exit(1);
  }
  // CASE 3: LOOKS LIKE STRING, IS A FILE IN CURRENT DIRECTORY
  let p = path.join(wd, name);

  if (existsSync(path.join(wd, name))) {
    return readFileSync(path.join(wd, name)).toString();
  }
  // CASE DEFAULT
  return name;

});

//invoke the function via the ref
fnRef(...fnArgs);