#!/usr/bin/env node
let args = process.argv.slice(2);

// concat the function.

//get params and construct arguments object
var genericFn = (name) => {
  console.log('hello', name);
};
var fnRef = genericFn
; // empty block to ensure final statement in user program doesn't collide with first statement here

// construct the arguments object from params

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


// check for files in the current directory, and use as input if they exist
// let wd = execSync('pwd').toString('utf8').replace('\n', '');
// let files = execSync('ls').toString('utf8').split('\n').slice(0, -1).filter(file => {
//   //console.log(path.join(wd, file));
//   return lstatSync(path.join(wd, file)).isFile()
// });


//TODO: get text if a filepath is specified

//invoke the function via the ref
fnRef(...fnArgs);