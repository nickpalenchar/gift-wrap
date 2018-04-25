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

// check for files in the current directory, and use as input if they exist
let wd = execSync('pwd').toString('utf8').replace('\n','');
let files = execSync('ls').toString('utf8').split('\n').slice(0,-1).filter(file => {
    //console.log(path.join(wd, file));
    return lstatSync(path.join(wd,file)).isFile()
});


//TODO: get text if a filepath is specified

//invoke the function via the ref
fnRef(...fnArgs);