

// construct the arguments object from params

let fnArgs = [];
let paramNames = fnRef.match(/function.*\((.*)\)/)[1].split(',');
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